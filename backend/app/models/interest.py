from __future__ import annotations

from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class Interest(SQLModel, table=True):
    __tablename__ = "interests"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
