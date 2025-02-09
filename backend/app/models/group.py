# app/models/group.py
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.database import Base


class Group(Base):
    __tablename__ = "groups"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    invite_code = Column(String, unique=True)  # Unique code for joining
    max_size = Column(Integer, default=6)  # MVP: Max 6 members
    # Add a created by field to track the user who created the group,
    # but add -1 as a default value
    created_by = Column(Integer, default=-1)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
