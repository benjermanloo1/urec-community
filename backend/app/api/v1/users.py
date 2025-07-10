from typing import Union

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select

from backend.app.core.db import get_session
from backend.app.models.email import Email
from backend.app.models.user import User, UserCreate, UserRead, UserSignIn
from backend.app.services.verify_email import create_message, mail
from backend.app.utils.utils import generate_code, is_valid_jmu_email

router = APIRouter(tags=["users"])


@router.post("/send-email")
async def send_email(emails: Email):
    emails = emails.addresses

    code = generate_code()

    html = f"<h1>VERIFY YO EMAIL WITH THIS CODE {code}</h1>"

    message = create_message(emails, "Verify your email", html)

    await mail.send_message(message)

    return {"message": "Email sent successfully", "code": code}


@router.post("/sign-in")
async def sign_in(user_data: UserSignIn, session=Depends(get_session)):
    res = session.exec(select(User).where(User.email == user_data.email))
    user = res.first()

    if not user:
        raise HTTPException(status_code=400, detail="No user with this email exists")

    return user


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

    db_user = User(
        email=user_data.email,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
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
