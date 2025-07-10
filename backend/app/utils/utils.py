import secrets

from itsdangerous import URLSafeTimedSerializer

JMU_EMAIL_FORMAT = "@dukes.jmu.edu"


def is_valid_jmu_email(email: str) -> bool:
    return email.endswith(JMU_EMAIL_FORMAT)


def generate_code():
    return f"{secrets.randbelow(10**6):06}"
