__version__ = "1.0.0"

from .interest import Interest
from .user import User


def rebuild_models():
    User.model_rebuild()
    Interest.model_rebuild()


rebuild_models()
