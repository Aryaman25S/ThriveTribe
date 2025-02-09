# migrate.py

# WARNING DO NOT RUN
# This script is used to create the database tables.
# It is a one-time script that should be run only once.

import asyncio
from app.database import engine, Base
from app.models.user import User
from app.models.group import Group
from app.models.task import Task
from app.models.user_group import UserGroup


async def migrate():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)


if __name__ == "__main__":
    asyncio.run(migrate())
