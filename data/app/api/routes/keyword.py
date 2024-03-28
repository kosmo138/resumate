from fastapi import APIRouter
from service.keyword import select_keyword
import urllib.parse

router = APIRouter()

@router.get("/")
def null_company_error():
    return {"status": "fail", "message": "Company name is required."}

@router.get("/{company}")
def get_keyword(company: str):
    company = urllib.parse.unquote(company)
    return select_keyword(company)