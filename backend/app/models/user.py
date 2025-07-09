from datetime import datetime, timezone
from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    first_name: str
    last_name: str
    is_active: bool = True
    profile_picture_url: Optional[str] = None
    signup_completed: bool = False


class User(UserBase, table=True):
    __tablename__ = "users"

    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: Optional[datetime] = None

    # interests: List["UserInterest"] = Relationship(back_populates="user")


class UserCreate(SQLModel):
    email: str
    first_name: str
    last_name: str


class UserRead(SQLModel):
    id: int
    email: str
    first_name: str
    last_name: str
    is_active: bool
    signup_completed: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    profile_picture_url: Optional[str] = None


class UserSignIn(SQLModel):
    email: str


class UserUpdate(SQLModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    profile_picture_url: Optional[str] = None
    signup_completed: Optional[bool] = None
