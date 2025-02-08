# app/schemas.py
from pydantic import BaseModel
from datetime import datetime


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
