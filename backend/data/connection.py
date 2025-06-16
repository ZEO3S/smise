import os
from dotenv import load_dotenv
from sqlmodel import SQLModel, Session, create_engine

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv()  # .env 파일에서 환경 변수 로드

database_username = os.getenv('DB_USER')
database_password = os.getenv('DB_PASSWORD')
database_host = os.getenv('DB_HOST')
database_port = os.getenv('DB_PORT', '3306')
database_name = os.getenv('DB_NAME')

database_connection_string = (
    f"mysql+pymysql://{database_username}:{database_password}@"
    f"{database_host}:{database_port}/{database_name}"
)
engine = create_engine(database_connection_string, echo=True)

def get_session():
    with Session(engine) as session:
        yield session