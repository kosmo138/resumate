from fastapi import APIRouter

from app.api.routes import letter

api_router = APIRouter()
api_router.include_router(letter.router, prefix="/letter", tags=["letter"])