from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.base import get_db
from app.schemas.schemas import AnalysisCreate, AnalysisOut
from app.services.analysis_service import AnalysisService
from app.security.auth import get_current_user
from app.models.domain import User

router = APIRouter(prefix="/analyses", tags=["analysis"])


@router.post("", response_model=AnalysisOut, status_code=status.HTTP_201_CREATED)
def create_analysis(payload: AnalysisCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> AnalysisOut:
    service = AnalysisService(db)
    analysis = service.analyze_content({**payload.model_dump(), "user_id": current_user.id})
    return AnalysisOut(
        id=analysis.id,
        status=analysis.status,
        classification=analysis.classification,
        sentiment=analysis.sentiment,
        emotion=analysis.emotion,
        threat_category=analysis.threat_category,
        scam_type=analysis.scam_type,
        risk_score=analysis.risk_score,
        confidence=analysis.confidence,
        summary=analysis.summary,
        entities=analysis.entities,
        metadata=analysis.metadata_data,
        created_at=analysis.created_at,
    )


@router.get("", response_model=list[AnalysisOut])
def list_analyses(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> list[AnalysisOut]:
    from app.models.domain import Analysis
    from sqlalchemy import select

    analyses = db.scalars(select(Analysis).where(Analysis.user_id == current_user.id)).all()
    return [
        AnalysisOut(
            id=analysis.id,
            status=analysis.status,
            classification=analysis.classification,
            sentiment=analysis.sentiment,
            emotion=analysis.emotion,
            threat_category=analysis.threat_category,
            scam_type=analysis.scam_type,
            risk_score=analysis.risk_score,
            confidence=analysis.confidence,
            summary=analysis.summary,
            entities=analysis.entities,
            metadata=analysis.metadata_data,
            created_at=analysis.created_at,
        )
        for analysis in analyses
    ]
