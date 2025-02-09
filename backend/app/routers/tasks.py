# app/routers/tasks.py

from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.task import Task, TaskStatus
from app.models.user import User
from app.models.user_group import UserGroup
from app.models.group import Group
from app.schemas import TaskCreate, TaskResponse, TaskUpdate
from app.models.static_task import StaticTask
from sqlalchemy import func
from typing import List
from datetime import datetime, timedelta
import shortuuid

router = APIRouter()


@router.post(
    "/{user_name}", status_code=status.HTTP_201_CREATED, response_model=TaskResponse
)
async def create_task(
    task_data: TaskCreate, user_name: str, db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(User).filter(User.user_name == user_name))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    new_task = Task(
        title=task_data.title,
        description=task_data.description,
        assigned_to=user.id,
    )
    db.add(new_task)
    await db.commit()
    await db.refresh(new_task)
    return new_task


@router.get("/{user_name}", response_model=List[TaskResponse])
async def list_tasks(user_name: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).filter(User.user_name == user_name))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    result = await db.execute(select(Task).filter(Task.assigned_to == user.id))
    tasks = result.scalars().all()

    return tasks


@router.get("/gettoday/{user_name}", response_model=TaskResponse)
async def get_today_tasks(user_name: str, db: AsyncSession = Depends(get_db)):
    print("user_name = ", user_name)
    result = await db.execute(select(User).filter(User.user_name == user_name))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="Sorry, User not found")

    now = datetime.now()
    start_of_day = datetime(now.year, now.month, now.day, 0, 0, 0)
    end_of_day = start_of_day + timedelta(days=1)

    result = await db.execute(
        select(Task)
        .filter(Task.assigned_to == user.id)
        .filter(Task.created_at >= start_of_day)
        .filter(Task.created_at <= end_of_day)
        .filter(Task.status == TaskStatus.PENDING)
    )
    # Get the first task
    task = result.scalar_one_or_none()

    if not task:
        # Retrieve a random static task
        result = await db.execute(select(StaticTask).order_by(func.random()).limit(1))
        static_task = result.scalar_one_or_none()
        if not static_task:
            raise HTTPException(status_code=404, detail="No static tasks found")

        # Optionally, you can convert the static task to a regular task
        task = Task(
            title=static_task.title,
            description=static_task.description,
            assigned_to=user.id,
            created_at=now,
            status=TaskStatus.PENDING,
            points=static_task.points,
        )
        db.add(task)
        await db.commit()
        await db.refresh(task)

    return task


@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(task_id: int, db: AsyncSession = Depends(get_db)):
    # Retrieve the task by task_id
    result = await db.execute(select(Task).filter(Task.id == task_id))
    task = result.scalar_one_or_none()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.get("/getprevious/{user_name}", response_model=TaskResponse)
async def get_previous_tasks(user_name: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).filter(User.user_name == user_name))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    now = datetime.now()
    start_of_day = datetime(now.year, now.month, now.day, 0, 0, 0)
    end_of_day = start_of_day + timedelta(days=1)

    result = await db.execute(
        select(Task)
        .filter(Task.assigned_to == user.id)
        .filter(Task.created_at < start_of_day)
    )
    # Get the first task
    task = result.scalar_one_or_none()
    if not task:
        # Select a random task from the static_task table
        result = await db.execute(select(Task).filter(Task.assigned_to == 0))
        task = result.scalar_one_or_none()
        if not task:
            raise HTTPException(status_code=404, detail="No tasks found")
    return task


@router.patch("/update/{task_id}", response_model=TaskResponse)
async def update_task(
    task_id: int, task_update: TaskUpdate, db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Task).filter(Task.id == task_id))
    task = result.scalar_one_or_none()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Update fields
    if task_update.title:
        task.title = task_update.title
    if task_update.description:
        task.description = task_update.description
    if task_update.assigned_to:
        result = await db.execute(
            select(User).filter(User.user_name == task_update.assigned_to)
        )
        user = result.scalar_one_or_none()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        task.assigned_to = user.id

    db.add(task)
    await db.commit()
    await db.refresh(task)

    return task


@router.patch("/complete/{user_name}", response_model=TaskResponse)
async def complete_task(user_name: str, db: AsyncSession = Depends(get_db)):
    # Retrieve the user by username
    result = await db.execute(select(User).filter(User.user_name == user_name))
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Retrieve the task assigned to the user for today
    now = datetime.now()
    start_of_day = datetime(now.year, now.month, now.day, 0, 0, 0)
    end_of_day = start_of_day + timedelta(days=1)

    result = await db.execute(
        select(Task)
        .filter(Task.assigned_to == user.id)
        .filter(Task.created_at >= start_of_day)
        .filter(Task.created_at < end_of_day)
        .filter(Task.status != TaskStatus.COMPLETED)
    )
    task = result.scalar_one_or_none()

    if not task:
        raise HTTPException(
            status_code=404, detail="No incomplete task found for today"
        )

    # Mark the task as completed
    task.status = TaskStatus.COMPLETED
    db.add(task)
    await db.commit()
    await db.refresh(task)

    # Retrieve the group the user belongs to
    result = await db.execute(
        select(Group).join(UserGroup).filter(UserGroup.user_id == user.id)
    )
    group = result.scalar_one_or_none()

    if not group:
        raise HTTPException(status_code=404, detail="User is not part of any group")

    # Get all members of the group
    result = await db.execute(
        select(User).join(UserGroup).filter(UserGroup.group_id == group.id)
    )
    members = result.scalars().all()

    # Check if all members have completed their tasks for today
    all_completed = True
    for member in members:
        result = await db.execute(
            select(Task)
            .filter(Task.assigned_to == member.id)
            .filter(Task.created_at >= start_of_day)
            .filter(Task.created_at < end_of_day)
            .filter(Task.status != TaskStatus.COMPLETED)
        )
        incomplete_task = result.scalar_one_or_none()
        if incomplete_task:
            all_completed = False
            break

    if all_completed:
        # Award points to the group
        # Implement your logic to award points to the group here
        pass

    return task
