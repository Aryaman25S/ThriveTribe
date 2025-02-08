# app/routers/group.py
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.group import Group
from app.models.user_group import UserGroup
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


@router.delete("/delete-group/{group_id}", status_code=204)
async def delete_group(group_id: int, db: AsyncSession = Depends(get_db)):
    group = await db.get(Group, group_id)
    if group is None:
        raise HTTPException(status_code=404, detail="Group not found")
    await db.delete(group)
    await db.commit()
    return None
