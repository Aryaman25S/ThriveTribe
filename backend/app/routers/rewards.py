# app/routers/rewards.py
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.reward import Reward
from app.models.user import User
from app.schemas import RewardResponse
from datetime import datetime, timedelta
import shortuuid

router = APIRouter()


@router.get("/getall", response_model=list[RewardResponse])
async def get_all_rewards(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Reward))
    rewards = result.scalars().all()

    if not rewards:
        raise HTTPException(status_code=404, detail="No rewards found")

    return rewards
