from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select

from backend.app.core.db import get_session
from backend.app.models.email import Email
from backend.app.models.user import User, UserCreate, UserRead, UserSignIn
from backend.app.services.verify_email import create_message, generate_code, mail
from backend.app.utils.utils import is_valid_jmu_email

router = APIRouter(tags=["users"])


@router.post("/send-email")
async def send_email(emails: Email):
    emails = emails.addresses

    if not is_valid_jmu_email(emails[0]):
        return {"message": "Not a valid email", "email": emails}

    code = generate_code(emails)

    html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8" />
            <style>
            body {{
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                padding: 20px;
                text-align: center;
                color: #333;
            }}
            .container {{
                background-color: #ffffff;
                border-radius: 10px;
                padding: 30px;
                max-width: 500px;
                margin: 0 auto;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }}
            .code {{
                font-size: 36px;
                letter-spacing: 4px;
                font-weight: bold;
                color: #007BFF;
                margin: 20px 0;
            }}
            .message {{
                font-size: 16px;
                margin-bottom: 10px;
            }}
            </style>
        </head>
        <body>
            <div class="container">
            <h2>Email Verification</h2>
            <p class="message">Use the code below to verify your email address:</p>
            <div class="code">{code}</div>
            <p class="message">This code will expire in 15 minutes.</p>
            </div>
        </body>
        </html>
        """

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
