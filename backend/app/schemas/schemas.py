from __future__ import annotations

from datetime import datetime
from typing import Any, Optional

from pydantic import BaseModel, EmailStr, Field


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenRefresh(BaseModel):
    refresh_token: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterRequest(BaseModel):
    email: EmailStr
    username: str = Field(min_length=3, max_length=100)
    full_name: Optional[str] = Field(default=None, max_length=255)
    password: str = Field(min_length=8, max_length=128)


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str = Field(min_length=8, max_length=128)


class UserOut(BaseModel):
    id: str
    email: EmailStr
    username: str
    full_name: Optional[str]
    is_active: bool
    is_verified: bool
    role_name: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class AnalysisCreate(BaseModel):
    source: str = Field(default="manual")
    platform: str = Field(default="web")
    content_type: str = Field(default="text")
    text: str = Field(min_length=1)
    url: Optional[str] = None
    metadata: Optional[dict[str, Any]] = None


class AnalysisOut(BaseModel):
    id: str
    status: str
    classification: Optional[str]
    sentiment: Optional[str]
    emotion: Optional[str]
    threat_category: Optional[str]
    scam_type: Optional[str]
    risk_score: float
    confidence: float
    summary: Optional[str]
    entities: Optional[dict[str, Any]]
    metadata: Optional[dict[str, Any]]
    created_at: datetime

    model_config = {"from_attributes": True}


class ReportOut(BaseModel):
    id: str
    title: str
    report_type: str
    file_path: Optional[str]
    created_at: datetime

    model_config = {"from_attributes": True}


class ThreatOut(BaseModel):
    id: str
    name: str
    severity: str
    confidence: float
    recommendation: Optional[str]

    model_config = {"from_attributes": True}


class NotificationOut(BaseModel):
    id: str
    title: str
    message: str
    is_read: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class HistoryOut(BaseModel):
    id: str
    entity_type: str
    entity_id: str
    action: str
    created_at: datetime

    model_config = {"from_attributes": True}


class SettingOut(BaseModel):
    key: str
    value: str


class SettingIn(BaseModel):
    key: str
    value: str
