from itsdangerous import URLSafeTimedSerializer

JMU_EMAIL_FORMAT = "@dukes.jmu.edu"


def is_valid_jmu_email(email: str) -> bool:
    return email.endswith(JMU_EMAIL_FORMAT)


def create_url_safe_token(data: dict):
    pass
