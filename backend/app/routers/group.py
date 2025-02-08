from fastapi import APIRouter, HTTPException, status
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.group import Group
from app.models.user_group import UserGroup
import shortuuid

router = APIRouter()


def generate_invite_code():
    return shortuuid.ShortUUID().random(length=6).upper()


@router.post("/groups", status_code=201)
async def create_group(group_name: str, db: AsyncSession = get_db()):
    new_group = Group(
        name=group_name, invite_code=generate_invite_code(), max_size=6, created_by=1
    )
    db.add(new_group)
    await db.commit()
    await db.refresh(new_group)

    # Add the creator to the group
    db.add(UserGroup(user_id=1, group_id=new_group.id))
    await db.commit()

    return {"invite_code": new_group.invite_code}


@router.post("/groups/{invite_code}/join")
async def join_group(invite: str, user_id: int, db: AsyncSession = get_db()):
    result = await db.execute(select(Group).where(Group.invite_code == invite))
    group = result.scalar_one_or_none()

    if group is None:
        raise HTTPException(status_code=404, detail="Invalid invite code")

    members = await db.execute(select(UserGroup).where(UserGroup.group_id == group.id))

    if members.rowcount >= group.max_size:
        raise HTTPException(status_code=400, detail="Group is full")

    db.add(UserGroup(user_id=user_id, group_id=group.id))
    await db.commit()
    return {"message": "Joined group successfully"}


@router.get("/groups")
async def get_groups(db: AsyncSession = get_db()):
    result = await db.execute(select(Group))
    groups = result.scalars().all()
    return groups
