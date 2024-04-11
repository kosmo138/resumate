from fastapi import APIRouter, HTTPException
from app.service.keywordservice import thread_search_keyword
import urllib.parse #url 디코딩에 사용됨.

router = APIRouter() #APIRouter 클래스를 사용하여 새로운 라우터를 생성


@router.get("/") #핸들러 정의
def null_company_error(): #핸들러함수
    raise HTTPException(status_code=400, detail="회사명을 입력해 주세요.")


@router.get("/{company}")
def get_keyword(company: str):
    try:
        company = urllib.parse.unquote(company)
        return thread_search_keyword(company)
    except HTTPException as e:
        return e
    
    
