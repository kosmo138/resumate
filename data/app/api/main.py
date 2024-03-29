from fastapi import APIRouter

<<<<<<< HEAD
from app.api.routes import keyword
=======
from api.routes import keyword
>>>>>>> origin/dev

api_router = APIRouter()
api_router.include_router(keyword.router, prefix="/keyword", tags=["keyword"])