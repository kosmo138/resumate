from fastapi import APIRouter, Header, Body, Response
from app.service.letter_service import LetterService
from app.core.models import Letter

router = APIRouter()


@router.post("")
def post_letter(authorization: str = Header(None), letter: Letter = Body(...)):
    letter_service = LetterService(authorization=authorization)
    result: str = letter_service.thread_main(letter)
    return Response(content=result, media_type="text/plain")
