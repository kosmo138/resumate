<<<<<<< HEAD
from fastapi import APIRouter, HTTPException
from app.service.keyword import thread_scrape_keyword
=======
from fastapi import APIRouter
from service.keyword import select_keyword
>>>>>>> origin/dev
import urllib.parse

router = APIRouter()

@router.get("/")
def null_company_error():
<<<<<<< HEAD
    raise HTTPException(status_code=400, detail="회사명을 입력해 주세요.")
=======
    return {"status": "fail", "message": "Company name is required."}
>>>>>>> origin/dev

@router.get("/{company}")
def get_keyword(company: str):
    company = urllib.parse.unquote(company)
<<<<<<< HEAD
    return thread_scrape_keyword(company)
=======
    return select_keyword(company)
>>>>>>> origin/dev
