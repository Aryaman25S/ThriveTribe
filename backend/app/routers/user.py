from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.user import User
from app.schemas import UserResponse, UserUpdate

router = APIRouter()


@router.post("/", response_model=UserResponse)
async def create_user(user_data: UserUpdate, db: AsyncSession = Depends(get_db)):
    new_user = User(
        email=user_data.email,
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user


@router.get("/", response_model=list[UserResponse])
async def get_all_users(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User))
    return result.scalars().all()
