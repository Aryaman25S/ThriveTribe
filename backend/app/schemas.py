# app/schemas.py
from pydantic import BaseModel
from datetime import datetime
from typing import List
from app.models.task import TaskStatus


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str
    user_name: str


class UserLogin(UserBase):
    password: str


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


class UserBrief(BaseModel):
    id: int
    user_name: str
    email: str
    streak: int
    daily_incomplete_tasks: int

    class Config:
        from_attributes = True


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


class GroupResponseDetail(BaseModel):
    id: int
    name: str
    streak: int
    members: List[UserBrief]

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
    status: str

    class Config:
        from_attributes = True


class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    assigned_to: int | None = None
