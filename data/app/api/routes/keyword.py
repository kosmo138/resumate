from fastapi import APIRouter, HTTPException
from service.keyword import select_keyword
import urllib.parse

router = APIRouter()


@router.get("/")
def null_company_error():
    raise HTTPException(status_code=400, detail="Bad Request")


@router.get("/{company}")
def get_keyword(company: str):
    company = urllib.parse.unquote(company)
    return select_keyword(company)
