from sqlmodel import Field, Relationship, SQLModel


class UserInterest(SQLModel, table=True):
    user_id: int = Field(foreign_key="user.id", primary_key=True)
    interest_id: int = Field(foregitn_key="interest.id", primary_key=True)

    user: "User" = Relationship(back_populates="interests")
    interest: "Interest" = Relationship(back_populates="users")
