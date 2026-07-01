from __future__ import annotations

from pathlib import Path
from typing import Any

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet

from app.core.config import get_settings

settings = get_settings()


class ReportService:
    def __init__(self) -> None:
        Path(settings.REPORTS_DIR).mkdir(parents=True, exist_ok=True)

    def generate_pdf(self, analysis: Any, title: str) -> str:
        path = Path(settings.REPORTS_DIR) / f"{analysis.id}.pdf"
        doc = SimpleDocTemplate(str(path), pagesize=letter)
        styles = getSampleStyleSheet()
        story = [Paragraph(title, styles["Title"]), Spacer(1, 12)]
        story.append(Paragraph(f"Classification: {analysis.classification or 'n/a'}", styles["BodyText"]))
        story.append(Paragraph(f"Sentiment: {analysis.sentiment or 'n/a'}", styles["BodyText"]))
        story.append(Paragraph(f"Threat: {analysis.threat_category or 'n/a'}", styles["BodyText"]))
        story.append(Paragraph(f"Risk: {analysis.risk_score}", styles["BodyText"]))
        story.append(Spacer(1, 12))
        data = [["Item", "Value"], ["Summary", analysis.summary or ""], ["Confidence", str(analysis.confidence)]]
        table = Table(data, repeatRows=1)
        table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#2563eb")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
            ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
        ]))
        story.append(table)
        doc.build(story)
        return str(path)
