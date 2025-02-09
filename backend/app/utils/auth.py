from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User
from passlib.context import CryptContext
import jwt

SECRET_KEY = "thrive" 
ALGORITHM = "HS256"

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Function to hash passwords
def get_password_hash(password: str):
    return pwd_context.hash(password)

# Function to verify password
def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Create a new user
async def create_user_auth(db: AsyncSession, email: str, user_name: str, firebase_uid: str, password: str, preferences: dict = None):
    hashed_password = get_password_hash(password)
    db_user = User(
        email=email, 
        user_name=user_name, 
        hashed_password=hashed_password, 
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

# Get a user by email
async def get_user_by_email(db: AsyncSession, email: str):
    result = await db.execute(select(User).filter(User.email == email))
    return result.scalars().first()

# Get a user by user_name
async def get_user_by_user_name(db: AsyncSession, user_name: str):
    result = await db.execute(select(User).filter(User.user_name == user_name))
    return result.scalars().first()
