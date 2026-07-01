from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.database.base import get_db
from app.models.domain import Analysis, Threat, User
from app.security.auth import get_current_user

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/stats")
def stats(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> dict[str, int]:
    analysis_count = db.scalar(select(func.count(Analysis.id)).where(Analysis.user_id == current_user.id)) or 0
    threat_count = db.scalar(select(func.count(Threat.id)).join(Analysis).where(Analysis.user_id == current_user.id)) or 0
    return {"analysis_count": int(analysis_count), "threat_count": int(threat_count)}
