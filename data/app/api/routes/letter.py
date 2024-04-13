from fastapi import APIRouter, Header, Body, Response
from app.service.letterservice import LetterService
from app.core.models import Letter
router = APIRouter()
letter_service = LetterService()


@router.post("/")
def post_letter(authorization: str = Header(None), letter: Letter = Body(...)):
    result_json = letter_service.post_letter(authorization, letter)
    return Response(content=result_json, media_type="application/json")
