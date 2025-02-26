from fastapi import FastAPI
from app.routers import user, group, tasks, rewards
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="ThriveTribe API")

app.include_router(user.router, prefix="/users", tags=["users"])
app.include_router(group.router, prefix="/groups", tags=["groups"])
app.include_router(tasks.router, prefix="/tasks", tags=["tasks"])
app.include_router(rewards.router, prefix="/rewards", tags=["rewards"])

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost:8081",
    "http://localhost:19006",
]

app.add_middleware(
    CORSMiddleware,  # this middleware will allow requests from the origins
    allow_origins=origins,  # list of origins that are allowed
    allow_credentials=True,  # allow credentials
    allow_methods=["*"],  # allow all methods
    allow_headers=["*"],  # allow all headers
)
