# FastAPI를 사용하여 "/data"경로에 대한 요청을 처리하는 웹 애플리케이션을 설정함.
from fastapi import FastAPI
from app.api.main import api_router

# FastAPI를 사용하여 웹 애플리케이션을 생성하고, 해당 애플리케이션에 라우터를 추가하는 것.
app = FastAPI() #FastAPI 인스턴스 생성(웹 애플리케이션을 생성).
app.include_router(api_router, prefix="/data") #api_router를 애플리케이션에 포함.
