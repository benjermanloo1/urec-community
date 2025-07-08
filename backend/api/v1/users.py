from typing import Union

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select

from backend.app.core.db import get_session
from backend.app.models.user import User, UserCreate, UserRead
from backend.app.utils.utils import hash_password, is_valid_jmu_email, verify_password

router = APIRouter(tags=["users"])


@router.post("/sign-up", response_model=UserRead)
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


@router.get("/users/{user_id}", response_model=UserRead)
async def get_user(user_id: int, session=Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
