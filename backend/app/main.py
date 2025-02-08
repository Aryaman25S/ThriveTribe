from fastapi import FastAPI
from app.routers import user

app = FastAPI(title="ThriveTribe API")

app.include_router(user.router, prefix="/users", tags=["users"])

# (Later, include other routers for groups, tasks, etc.)
