from sqlmodel import SQLModel


class Email(SQLModel):
    email: str


class VerificationCode(SQLModel):
    email: str
    code: str
