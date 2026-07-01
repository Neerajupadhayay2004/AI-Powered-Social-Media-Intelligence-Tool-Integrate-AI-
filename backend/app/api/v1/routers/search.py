from fastapi import APIRouter, Depends, Query
from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from app.database.base import get_db
from app.models.domain import Analysis, Content, User
from app.security.auth import get_current_user

router = APIRouter(prefix="/search", tags=["search"])


@router.get("")
def search(
    q: str = Query(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[dict]:
    query = select(Analysis).join(Content).where(Analysis.user_id == current_user.id)
    if q:
        query = query.where(or_(Analysis.summary.ilike(f"%{q}%"), Content.text.ilike(f"%{q}%")))
    analyses = db.scalars(query).all()
    return [{"id": analysis.id, "summary": analysis.summary, "classification": analysis.classification} for analysis in analyses]
