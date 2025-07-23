JMU_EMAIL_FORMAT = "@dukes.jmu.edu"


def is_valid_jmu_email(email: str) -> bool:
    return email.endswith(JMU_EMAIL_FORMAT)
