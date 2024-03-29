from fastapi import APIRouter

from api.routes import keyword

api_router = APIRouter()
api_router.include_router(keyword.router, prefix="/keyword", tags=["keyword"])