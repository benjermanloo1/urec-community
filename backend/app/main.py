from contextlib import asynccontextmanager
from typing import Union

from app.core.db import create_db_and_tables, get_session
from app.models.user import User, UserCreate, UserRead
from app.utils.utils import hash_password, is_valid_jmu_email, verify_password
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import select


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    print("Database tables created")
    yield
    print("Shutting down...")


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.post("/sign-up")
async def create_user(user_data: UserCreate, session=Depends(get_session)):
    if not is_valid_jmu_email(user_data.email):
        raise HTTPException(
            status_code=400, detail="Only @dukes.jmu.edu email addresses are allowed"
        )

    existing_user = session.exec(
        select(User).where(User.email == user_data.email)
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400, detail="User with this email already exists"
        )

    hashed_password = hash_password(user_data.password)

    db_user = User(
        email=user_data.email,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        hashed_password=hashed_password,
    )

    session.add(db_user)
    session.commit()
    session.refresh(db_user)

    return db_user


@app.get("/users/{user_id}", response_model=UserRead)
async def get_user(user_id: int, session=Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
