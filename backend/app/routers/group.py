# app/routers/group.py
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.group import Group
from app.models.user_group import UserGroup
from app.models.user import User
from app.schemas import GroupCreate, GroupResponse
import shortuuid

router = APIRouter()


def generate_invite_code():
    return shortuuid.ShortUUID().random(length=6).upper()


@router.post("/groups", status_code=201, response_model=GroupResponse)
async def create_group(group_data: GroupCreate, db: AsyncSession = Depends(get_db)):
    new_group = Group(
        name=group_data.name,
        invite_code=generate_invite_code(),
        max_size=6,
    )
    db.add(new_group)
    await db.commit()
    await db.refresh(new_group)
    return new_group


@router.get("/groups", response_model=list[GroupResponse])
async def list_groups(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Group))
    return result.scalars().all()


@router.get("/{user_name}", response_model=list[GroupResponse])
async def get_user_groups(user_name: str, db: AsyncSession = Depends(get_db)):
    checkusr = await db.execute(
        select(UserGroup).filter(UserGroup.user_name == user_name)
    )
    user = checkusr.scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    result = await db.execute(select(Group).filter(Group.id == user.group_id))
    return result.scalars().all()


@router.post("/join-group/{invite_code}/{user_name}", status_code=204)
async def join_group(
    invite_code: str,
    user_name: str,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Group).filter(Group.invite_code == invite_code))
    group = result.scalar_one_or_none()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    user = await db.execute(select(User).filter(User.name == user_name))
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    checkusr = await db.execute(
        select(UserGroup).where(
            UserGroup.user_id == user.id,
            UserGroup.group_id == group.id,
        )
    )
    usergroup = checkusr.scalar_one_or_none()
    if usergroup:
        raise HTTPException(status_code=400, detail="User already in group")

    # Check if group is full
    result = await db.execute(select(UserGroup).filter(UserGroup.group_id == group.id))
    group_size = result.scalars().all()
    if len(group_size) >= group.max_size:
        raise HTTPException(status_code=400, detail="Group is full")

    new_user_group = UserGroup(
        user_id=user.id,
        group_id=group.id,
    )
    db.add(new_user_group)
    await db.commit()
    return None


@router.delete("/delete-group/{group_id}", status_code=204)
async def delete_group(group_id: int, db: AsyncSession = Depends(get_db)):
    group = await db.get(Group, group_id)
    if group is None:
        raise HTTPException(status_code=404, detail="Group not found")
    await db.delete(group)
    await db.commit()
    return None
