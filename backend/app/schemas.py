# app/schemas.py
from pydantic import BaseModel
from datetime import datetime
from app.models.task import TaskStatus


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
        from_attributes = True


class TaskCreate(BaseModel):
    title: str
    description: str
    assigned_to_usrname: str


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str
    assigned_to: int
    created_at: datetime

    class Config:
        from_attributes = True


class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    assigned_to: int | None = None
