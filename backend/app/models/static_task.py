# app/models/static_task.py
from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class StaticTask(Base):
    __tablename__ = "static_tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String, nullable=False)
