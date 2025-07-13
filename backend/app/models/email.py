from sqlmodel import SQLModel


class Email(SQLModel):
    email: str
