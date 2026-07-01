from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.base import get_db
from app.models.domain import History, User
from app.security.auth import get_current_user

router = APIRouter(prefix="/history", tags=["history"])


@router.get("")
def list_history(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> list[dict]:
    history = db.query(History).filter(History.user_id == current_user.id).all()
    return [{"id": item.id, "entity_type": item.entity_type, "entity_id": item.entity_id, "action": item.action, "created_at": item.created_at} for item in history]
