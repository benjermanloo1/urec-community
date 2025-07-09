from typing import List

from sqlmodel import SQLModel


class Email(SQLModel):
    addresses: List[str]
