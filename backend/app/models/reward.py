# app/models/reward.py
from sqlalchemy import Column, Integer, String, Float
from app.database import Base


class Reward(Base):
    __tablename__ = "rewards"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    value = Column(Float, nullable=False)  # Monetary value of the reward
    description = Column(String, nullable=True)  # Description of the reward
