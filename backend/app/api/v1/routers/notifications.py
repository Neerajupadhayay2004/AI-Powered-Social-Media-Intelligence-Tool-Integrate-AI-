from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.base import get_db
from app.models.domain import Notification, User
from app.security.auth import get_current_user

router = APIRouter(prefix="/notifications", tags=["notifications"])


@router.get("")
def list_notifications(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> list[dict]:
    notifications = db.query(Notification).filter(Notification.user_id == current_user.id).all()
    return [{"id": item.id, "title": item.title, "message": item.message, "is_read": item.is_read, "created_at": item.created_at} for item in notifications]
