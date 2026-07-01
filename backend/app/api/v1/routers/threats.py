from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.base import get_db
from app.models.domain import Threat, User, Analysis
from app.security.auth import get_current_user

router = APIRouter(prefix="/threats", tags=["threats"])


@router.get("")
def list_threats(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> list[dict]:
    threats = db.query(Threat).join(Analysis).filter(Analysis.user_id == current_user.id).all()
    return [{"id": threat.id, "name": threat.name, "severity": threat.severity, "confidence": threat.confidence, "recommendation": threat.recommendation} for threat in threats]
