# app/routers/tasks.py

from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.task import Task
from app.models.user import User
from app.schemas import TaskCreate, TaskResponse, TaskUpdate
from typing import List
from app.models.task import TaskStatus
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


@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(task_id: int, db: AsyncSession = Depends(get_db)):
    # Retrieve the task by task_id
    result = await db.execute(select(Task).filter(Task.id == task_id))
    task = result.scalar_one_or_none()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
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
