from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.base import get_db
from app.models.domain import User
from app.security.auth import get_current_user, require_roles

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/users")
def list_users(db: Session = Depends(get_db), current_user: User = Depends(require_roles("admin"))) -> list[dict]:
    users = db.query(User).all()
    return [{"id": user.id, "email": user.email, "username": user.username, "is_active": user.is_active, "is_verified": user.is_verified} for user in users]
