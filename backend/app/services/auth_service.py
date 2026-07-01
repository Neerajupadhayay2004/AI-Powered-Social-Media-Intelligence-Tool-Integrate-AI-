from __future__ import annotations

from datetime import datetime, timedelta
from typing import Any

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.domain import User, Role, AuditLog
from app.security.auth import create_access_token, create_refresh_token, get_password_hash, verify_password


class AuthService:
    def __init__(self, db: Session):
        self.db = db

    def register(self, email: str, username: str, full_name: str | None, password: str) -> User:
        existing = self.db.scalar(select(User).where((User.email == email) | (User.username == username)))
        if existing:
            raise HTTPException(status_code=400, detail="Email or username already exists")

        role = self.db.scalar(select(Role).where(Role.name == "viewer"))
        if not role:
            role = Role(name="viewer", description="Default viewer role")
            self.db.add(role)
            self.db.flush()

        user = User(
            email=email,
            username=username,
            full_name=full_name,
            hashed_password=get_password_hash(password),
            role_id=role.id,
            is_verified=True,
        )
        self.db.add(user)
        self.db.flush()
        self.db.add(AuditLog(user_id=user.id, action="register", details={"email": email}))
        self.db.commit()
        self.db.refresh(user)
        return user

    def login(self, email: str, password: str) -> dict[str, Any]:
        user = self.db.scalar(select(User).where(User.email == email))
        if not user or not verify_password(password, user.hashed_password):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        if not user.is_active:
            raise HTTPException(status_code=403, detail="User disabled")

        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)
        self.db.add(AuditLog(user_id=user.id, action="login", details={"email": email}))
        self.db.commit()
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "user": user,
        }

    def refresh(self, refresh_token: str) -> dict[str, Any]:
        from app.security.auth import decode_token

        try:
            payload = decode_token(refresh_token)
        except Exception as exc:
            raise HTTPException(status_code=401, detail="Invalid refresh token") from exc
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid refresh token")
        user = self.db.get(User, payload.get("sub"))
        if not user or not user.is_active:
            raise HTTPException(status_code=401, detail="User not found")
        return {
            "access_token": create_access_token(user.id),
            "refresh_token": create_refresh_token(user.id),
            "token_type": "bearer",
        }

    def forgot_password(self, email: str) -> None:
        user = self.db.scalar(select(User).where(User.email == email))
        if user:
            user.reset_password_token = "demo-token"
            user.reset_password_expires_at = datetime.utcnow() + timedelta(hours=1)
            self.db.add(AuditLog(user_id=user.id, action="forgot_password", details={"email": email}))
            self.db.commit()

    def reset_password(self, token: str, new_password: str) -> None:
        user = self.db.scalar(select(User).where(User.reset_password_token == token))
        if not user or not user.reset_password_expires_at or user.reset_password_expires_at < datetime.utcnow():
            raise HTTPException(status_code=400, detail="Invalid or expired reset token")
        user.hashed_password = get_password_hash(new_password)
        user.reset_password_token = None
        user.reset_password_expires_at = None
        self.db.commit()

    def verify_email(self, token: str) -> None:
        user = self.db.scalar(select(User).where(User.verification_token == token))
        if not user:
            raise HTTPException(status_code=400, detail="Invalid verification token")
        user.is_verified = True
        user.verification_token = None
        self.db.commit()
