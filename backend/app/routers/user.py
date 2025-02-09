from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.user import User
from app.schemas import UserResponse, UserUpdate, UserCreate, UserLogin
from app.utils.auth import (
    get_user_by_email,
    get_user_by_user_name,
    create_user_auth,
    verify_password,
    create_access_token,
)

router = APIRouter()


@router.post("/signup")
async def signup(user: UserCreate, db: AsyncSession = Depends(get_db)):
    # Check if the email or user_name already exists in the database
    db_user = await get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    db_user_by_username = await get_user_by_user_name(db, user.user_name)
    if db_user_by_username:
        raise HTTPException(
            status_code=400,
            detail="Username already taken",
        )

    # Create and save the new user in the database
    new_user = await create_user_auth(
        db,
        email=user.email,
        user_name=user.user_name,
        firebase_uid="",
        password=user.password,
        preferences={},
    )

    return {"msg": "User created successfully", "email": new_user.email}


@router.post("/login")
async def login(data: UserLogin, db: AsyncSession = Depends(get_db)):
    user = await get_user_by_email(db, data.email)
    if user is None or not verify_password(data.password, user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password",
        )
    # Create access token
    access_token = create_access_token(data={"sub": user.user_name})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/", response_model=UserResponse)
async def create_user(user_data: UserUpdate, db: AsyncSession = Depends(get_db)):
    new_user = User(
        email=user_data.email,
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).filter(User.id == user_id))
    user = result.scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.get("/", response_model=list[UserResponse])
async def get_all_users(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User))
    return result.scalars().all()


@router.patch("/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: int, update_data: UserUpdate, db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Update fields
    if update_data.email:
        user.email = update_data.email
    if update_data.preferences:
        user.preferences = update_data.preferences

    await db.commit()
    await db.refresh(user)
    return user


@router.delete("/{user_id}")
async def delete_user(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    await db.delete(user)
    await db.commit()
    return {"message": "User deleted"}


@router.get("/{user_name}/points")
async def get_user_points(user_name: str, db: AsyncSession = Depends(get_db)):
    user = await get_user_by_user_name(db, user_name)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {"username": user_name, "points": user.points}


@router.get("/{user_name}/rewards")
async def get_user_rewards(user_name: str, db: AsyncSession = Depends(get_db)):
    user = await get_user_by_user_name(db, user_name)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    rewards = [
        {"id": 1, "name": "Free coffee", "pointsRequired": 100, "revealed": False},
        {"id": 2, "name": "Free lunch", "pointsRequired": 200, "revealed": False},
        {"id": 3, "name": "Free dinner", "pointsRequired": 300, "revealed": False},
        {
            "id": 4,
            "name": "Free movie ticket",
            "pointsRequired": 400,
            "revealed": False,
        },
        {"id": 5, "name": "Free spa", "pointsRequired": 500, "revealed": False},
        {
            "id": 6,
            "name": "Free gym membership",
            "pointsRequired": 600,
            "revealed": False,
        },
    ]

    return {"username": user_name, "rewards": rewards}
