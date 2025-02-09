# app/models/user.py
from sqlalchemy import Column, String, JSON, DateTime, Integer
from sqlalchemy.sql import func
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firebase_uid = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    user_name = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    preferences = Column(
        JSON, default={"categories": []}
    )  # e.g., {"cleaning": 5, "cooking": 3}
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    streak = Column(Integer, default=0)
