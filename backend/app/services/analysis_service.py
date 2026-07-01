from __future__ import annotations

import re
from typing import Any

from sqlalchemy.orm import Session

from app.models.domain import Analysis, Content, Threat, Entity, URL


class AnalysisService:
    def __init__(self, db: Session):
        self.db = db

    def analyze_content(self, payload: dict[str, Any]) -> Analysis:
        text = payload.get("text", "")
        classification = self._classify_content(text)
        sentiment = self._analyze_sentiment(text)
        emotion = self._detect_emotion(text)
        threat_category = self._categorize_threat(text)
        scam_type = self._detect_scam(text)
        risk_score = self._score_risk(classification, sentiment, threat_category, scam_type)
        confidence = self._score_confidence(text)
        summary = self._summarize(text)
        entities = self._extract_entities(text)

        content = Content(
            source=payload.get("source", "manual"),
            platform=payload.get("platform", "web"),
            content_type=payload.get("content_type", "text"),
            text=text,
            url=payload.get("url"),
            metadata_data=payload.get("metadata"),
        )
        self.db.add(content)
        self.db.flush()

        analysis = Analysis(
            user_id=payload.get("user_id"),
            content_id=content.id,
            classification=classification,
            sentiment=sentiment,
            emotion=emotion,
            threat_category=threat_category,
            scam_type=scam_type,
            risk_score=risk_score,
            confidence=confidence,
            summary=summary,
            entities=entities,
            metadata_data=payload.get("metadata"),
        )
        self.db.add(analysis)
        self.db.flush()

        if threat_category:
            threat = Threat(
                analysis_id=analysis.id,
                name=threat_category,
                severity=self._severity_from_risk(risk_score),
                confidence=confidence,
                recommendation=self._recommendation(threat_category),
            )
            self.db.add(threat)

        for entity_type, values in entities.items():
            for value in values:
                self.db.add(Entity(analysis_id=analysis.id, entity_type=entity_type, value=value))

        for url in self._extract_urls(text):
            self.db.add(URL(analysis_id=analysis.id, value=url, risk_score=self._score_url_risk(url)))

        self.db.commit()
        self.db.refresh(analysis)
        return analysis

    def _classify_content(self, text: str) -> str:
        lowered = text.lower()
        if any(term in lowered for term in ["scam", "fraud", "lottery", "investment"]):
            return "Scam"
        if any(term in lowered for term in ["spam", "buy now", "free money"]):
            return "Spam"
        if any(term in lowered for term in ["news", "breaking", "election"]):
            return "News"
        if any(term in lowered for term in ["crypto", "bitcoin", "trading"]):
            return "Finance"
        if any(term in lowered for term in ["cyber", "malware", "phishing"]):
            return "Cybersecurity"
        return "Technology"

    def _analyze_sentiment(self, text: str) -> str:
        lowered = text.lower()
        negative = ["scam", "fraud", "bad", "angry", "threat", "fake"]
        positive = ["good", "great", "safe", "secure", "love"]
        if any(term in lowered for term in negative):
            return "Negative"
        if any(term in lowered for term in positive):
            return "Positive"
        return "Neutral"

    def _detect_emotion(self, text: str) -> str:
        lowered = text.lower()
        if any(term in lowered for term in ["angry", "furious", "hate"]):
            return "Anger"
        if any(term in lowered for term in ["fear", "scared", "afraid"]):
            return "Fear"
        if any(term in lowered for term in ["happy", "joy", "love"]):
            return "Joy"
        return "Neutral"

    def _categorize_threat(self, text: str) -> str:
        lowered = text.lower()
        if any(term in lowered for term in ["phishing", "password", "bank account"]):
            return "Phishing"
        if any(term in lowered for term in ["malware", "virus", "ransomware"]):
            return "Malware"
        if any(term in lowered for term in ["scam", "fraud", "lottery"]):
            return "Fraud"
        return "General"

    def _detect_scam(self, text: str) -> str:
        lowered = text.lower()
        if any(term in lowered for term in ["investment", "profits", "guaranteed"]):
            return "Investment Scam"
        if any(term in lowered for term in ["crypto", "bitcoin"]):
            return "Crypto Scam"
        if any(term in lowered for term in ["lottery", "winner"]):
            return "Lottery Scam"
        return None

    def _score_risk(self, classification: str, sentiment: str, threat_category: str, scam_type: str | None) -> float:
        risk = 0.2
        if classification in {"Scam", "Spam"}:
            risk += 0.3
        if sentiment == "Negative":
            risk += 0.2
        if threat_category in {"Phishing", "Fraud", "Malware"}:
            risk += 0.3
        if scam_type:
            risk += 0.2
        return round(min(risk, 1.0), 2)

    def _score_confidence(self, text: str) -> float:
        return round(min(0.95, 0.5 + len(text.split()) / 80), 2)

    def _summarize(self, text: str) -> str:
        return text[:200] if text else "No content"

    def _extract_entities(self, text: str) -> dict[str, list[str]]:
        pattern = re.compile(r"[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*")
        names = pattern.findall(text)
        emails = re.findall(r"[\w\.-]+@[\w\.-]+", text)
        phones = re.findall(r"\+?\d[\d\s\-]{7,}\d", text)
        urls = self._extract_urls(text)
        return {"names": names[:10], "emails": emails[:10], "phones": phones[:10], "urls": urls[:10]}

    def _extract_urls(self, text: str) -> list[str]:
        return re.findall(r"https?://[^\s]+", text)

    def _score_url_risk(self, url: str) -> float:
        return 0.4 if "bit.ly" in url or "tinyurl" in url else 0.1

    def _severity_from_risk(self, risk_score: float) -> str:
        if risk_score >= 0.8:
            return "critical"
        if risk_score >= 0.6:
            return "high"
        if risk_score >= 0.4:
            return "medium"
        return "low"

    def _recommendation(self, threat_category: str) -> str:
        mapping = {
            "Phishing": "Notify the user and verify the sender before clicking links.",
            "Malware": "Isolate the device and run a malware scan.",
            "Fraud": "Escalate to investigations and preserve evidence.",
        }
        return mapping.get(threat_category, "Review the content and escalate if necessary.")
