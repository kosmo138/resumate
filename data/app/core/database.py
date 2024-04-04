from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from core.env import DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME

DB_URI = f"mysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
engine = create_engine(DB_URI)  # mysql과의 연결을 engine객체 생성을 통해 이루어짐.

Session = sessionmaker(
    bind=engine
)  # engine을 사용하여 데이터베이스와의 세션을 생성하고 관리함.
session = (
    Session()
)  # 생성된 세션은 데이터베이스에 쿼리를 실행하고 데이터를 저장하는 데 사용됨.
