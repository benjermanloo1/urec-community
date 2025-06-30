from sqlmodel import SQLModel, Field

class UserBase(SQLModel):
  id: int
  name: str