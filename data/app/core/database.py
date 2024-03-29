from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
<<<<<<< HEAD
from app.core.env import DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME
=======
from core.env import DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME
>>>>>>> origin/dev

DB_URI = f"mysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
engine = create_engine(DB_URI)

Session = sessionmaker(bind=engine)
session = Session()