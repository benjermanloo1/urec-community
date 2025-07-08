from passlib.context import CryptContext

JMU_EMAIL_FORMAT = "@dukes.jmu.edu"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(pw: str) -> str:
    return pwd_context.hash(pw)


def verify_password(plain_pw: str, hashed_pw: str) -> str:
    return pwd_context.verify(plain_pw, hashed_pw)


def is_valid_jmu_email(email: str) -> bool:
    return email.endswith(JMU_EMAIL_FORMAT)
