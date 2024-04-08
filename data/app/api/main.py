from fastapi import APIRouter

from app.api.routes import keyword
from app.api.routes import test

api_router = APIRouter()  # api_router 인스턴스 : API엔드포인트 등록하는 데 사용됨.
api_router.include_router(keyword.router, prefix="/keyword", tags=["keyword"])
# keyword 모듈에서 정의된 엔드포인트를 APIRouter에 포함시킵니다.
# prefix="/keyword"는 해당 엔드포인트의 URL 경로에 접두사를 추가하여 /keyword로 시작하도록 지정합니다.
# tags=["keyword"]는 해당 엔드포인트를 문서화할 때 사용되는 태그를 지정합니다.

api_router.include_router(test.router, prefix="/test", tags=["test"])
