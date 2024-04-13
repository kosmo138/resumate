import json
from fastapi import APIRouter, Header, Body, Response
from app.service.letterservice import LetterService
from app.core.models import Letter
router = APIRouter()
letter_service = LetterService()


@router.post("/")
def post_letter(authorization: str = Header(None), letter: Letter = Body(...)):
    result: str = letter_service.thread_main(authorization, letter)
    return Response(content=result, media_type="application/json")
