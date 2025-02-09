# app/models/task.py
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime, Enum
from sqlalchemy.sql import func
from app.database import Base


class TaskStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    status = Column(String, default=TaskStatus.PENDING)
    assigned_to = Column(Integer, ForeignKey("users.id"))  # User ID
    created_at = Column(DateTime(timezone=True), server_default=func.now())
