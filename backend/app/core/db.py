import os
from pathlib import Path

from dotenv import load_dotenv
from sqlmodel import Session, SQLModel, create_engine
from supabase import create_client

env_path = Path(__file__).resolve().parent.parent.parent / ".env.local"

load_dotenv(dotenv_path=env_path)

uri = os.getenv("POSTGRES_URI")

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

if not uri:
    raise ValueError("POSTGRES_URI environment variable is required")

if not url:
    raise ValueError("SUPABASE_URL environment variable is required")

if not key:
    raise ValueError("SUPABASE_KEY environment variable is required")

supabase = create_client(url, key)

engine = create_engine(
    uri,
    echo=True,
    pool_pre_ping=True,
    pool_recycle=3600,
)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


def get_db_session():
    return Session(engine)
