from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime

class UserBase(SQLModel):
  email: str = Field(unique=True, index=True)
  first_name: str
  last_name: str
  is_active: bool = True
  profile_picture_url: Optional[str] = None
  signup_completed: bool = False
  
class User(UserBase, table=True()):
  __tablename__ = "users"
  
  id: Optional[int] = Field(default=None, primary_key=True)
  hashed_password: str
  created_at: datetime = Field(default_factory=datetime.now(datetime.timezone.utc))
  updated_at: Optional[datetime] = None

  interests: List["UserInterest"] = Relationship(back_populates="user")
  
class UserCreate(SQLModel):
  email: str
  password: str # hashed
  first_name: str
  last_name: str
  
class UserRead(UserBase):
  id: int
  created_ad: datetime
  
class UserUpdate(SQLModel):
  first_name: Optional[str] = None
  last_name: Optional[str] = None
  profile_picture_url: Optional[str] = None
  signup_completed: Optional[bool] = None