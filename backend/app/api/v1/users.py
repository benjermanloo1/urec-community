from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select

from backend.app.core.db import get_session
from backend.app.models.signup import Email, VerificationCode
from backend.app.models.user import User, UserCreate, UserRead, UserSignIn
from backend.app.services.verify_email import create_message, generate_code, mail, r
from backend.app.utils.utils import is_valid_jmu_email

router = APIRouter(tags=["users"])


@router.post("/sign-in")
async def sign_in(user_data: UserSignIn, session=Depends(get_session)):
    res = session.exec(select(User).where(User.email == user_data.email))
    user = res.first()

    if not user:
        raise HTTPException(status_code=400, detail="No user with this email exists")

    return user


@router.post("/sign-up")
async def send_verification_email(data: Email):
    email = data.email

    if not is_valid_jmu_email(email):
        return {"message": "Not a valid email", "email": email}

    code = generate_code(email)

    html = f"""
        <p>Use the code below to verify your email: <br>{code}<br><br>Please do not share this code with anyone else.</p>
        """

    message = create_message([email], "Verify your email", html)

    await mail.send_message(message)

    return {"message": "Email sent successfully", "code": code}


@router.post("/sign-up/verify")
async def verify_email(data: VerificationCode):
    email = data.email
    code = data.code

    if r.get(email) != code:
        return {"message": "Code does not match", "code": code}

    r.delete(email)

    return {"message": "Email successfully verified", "code": code}


@router.post("/sign-up/asdf", response_model=UserRead)
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

    try:
        db_user = User(
            email=user_data.email,
            first_name=user_data.first_name,
            last_name=user_data.last_name,
        )
    except Exception as error:
        print(error)

    session.add(db_user)
    session.commit()
    session.refresh(db_user)

    return db_user
