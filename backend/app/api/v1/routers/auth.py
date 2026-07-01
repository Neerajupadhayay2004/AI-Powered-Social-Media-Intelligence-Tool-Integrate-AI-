from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.base import get_db
from app.schemas.schemas import ForgotPasswordRequest, LoginRequest, RegisterRequest, ResetPasswordRequest, Token, UserOut
from app.services.auth_service import AuthService
from app.security.auth import get_current_user
from app.models.domain import User

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest, db: Session = Depends(get_db)) -> UserOut:
    service = AuthService(db)
    user = service.register(payload.email, payload.username, payload.full_name, payload.password)
    return UserOut(
        id=user.id,
        email=user.email,
        username=user.username,
        full_name=user.full_name,
        is_active=user.is_active,
        is_verified=user.is_verified,
        role_name=user.role.name if user.role else None,
        created_at=user.created_at,
    )


@router.post("/login", response_model=Token)
def login(payload: LoginRequest, db: Session = Depends(get_db)) -> Token:
    service = AuthService(db)
    result = service.login(payload.email, payload.password)
    return Token(access_token=result["access_token"], refresh_token=result["refresh_token"])


@router.post("/refresh", response_model=Token)
def refresh(payload: dict[str, str], db: Session = Depends(get_db)) -> Token:
    service = AuthService(db)
    result = service.refresh(payload.get("refresh_token", ""))
    return Token(access_token=result["access_token"], refresh_token=result["refresh_token"])


@router.post("/forgot-password")
def forgot_password(payload: ForgotPasswordRequest, db: Session = Depends(get_db)) -> dict[str, str]:
    service = AuthService(db)
    service.forgot_password(payload.email)
    return {"message": "If the account exists, a reset link has been sent"}


@router.post("/reset-password")
def reset_password(payload: ResetPasswordRequest, db: Session = Depends(get_db)) -> dict[str, str]:
    service = AuthService(db)
    service.reset_password(payload.token, payload.new_password)
    return {"message": "Password updated successfully"}


@router.get("/me", response_model=UserOut)
def me(current_user: User = Depends(get_current_user)) -> UserOut:
    return UserOut(
        id=current_user.id,
        email=current_user.email,
        username=current_user.username,
        full_name=current_user.full_name,
        is_active=current_user.is_active,
        is_verified=current_user.is_verified,
        role_name=current_user.role.name if current_user.role else None,
        created_at=current_user.created_at,
    )


@router.post("/logout")
def logout() -> dict[str, str]:
    return {"message": "Logged out successfully"}
