from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.get("/users")
async def read_users():
    return {"message": "Read users"}


@router.get("/signup")
async def signup(usrname: str, email: str, password: str):
    return {"message": "Signed up successfully"}
