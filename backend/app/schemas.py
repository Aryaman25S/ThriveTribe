# app/schemas.py
from pydantic import BaseModel
from datetime import datetime


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    pass  # Add extra fields for creation if needed (e.g., password)


class UserResponse(UserBase):
    id: int
    firebase_uid: str | None = None
    preferences: dict
    created_at: datetime

    class Config:
        from_attributes = True  # ORM mode


class UserUpdate(BaseModel):
    email: str | None = None
    preferences: dict | None = None


class GroupCreate(BaseModel):
    name: str


class GroupResponse(GroupCreate):
    id: int
    invite_code: str
    max_size: int
    created_by: int
    created_at: datetime

    class Config:
        from_attributes = True  # Allows ORM mode for SQLAlchemy
