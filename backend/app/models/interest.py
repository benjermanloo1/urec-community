from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List

class Interest(SQLModel, table=True):
  __tablename__ = "interests"
  
  id: Optional[int] = Field(default=None, primary_key=True)
  name: str = Field(unique=True)
  description: Optional[str] = None
  category: Optional[str] = None
  
class UserInterest(SQLModel, table=True):
  __tablename__ = "user_interests"
  
  user_id: int = Field(foreign_key="users.id", primary_key=True)
  interest_id: int = Field(foreign_key="interests.id", primary_key=True)
  
  user: "User" = Relationship(back_populates="interests")
  interest: Interest = Relationship()
  
class UserInterestCreate(SQLModel):
  interests_id: List[int]