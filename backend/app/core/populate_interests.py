import os

from sqlmodel import Session, SQLModel, select

from backend.app.core.db import engine
from backend.app.models.interest import Interest


def populate_interests(filepath: str):
    with open(filepath, "r") as f:
        interest_names = [line.strip() for line in f if line.strip()]

    with Session(engine) as session:
        for name in interest_names:
            exists = session.exec(select(Interest).where(Interest.name == name)).first()
            if not exists:
                session.add(Interest(name=name))
        session.commit()


if __name__ == "__main__":
    SQLModel.metadata.create_all(engine)

    base_dir = os.path.dirname(__file__)
    filepath = os.path.join(base_dir, "interests.txt")

    populate_interests(filepath)
