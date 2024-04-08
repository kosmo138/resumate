from fastapi import Header
import requests
from fastapi import APIRouter, HTTPException

router = APIRouter()


# FastAPI에서 JWT(Jason Web Token)를 헤더에서 받는 방법
@router.get("/")
def get_keyword(authorization: str = Header(...)):
    try:
        # JWT 파싱 및 처리
        jwt_token = authorization  # "Bearer" 부분 제거하지 않고 그대로 전달.
        # company = urllib.parse.unquote(company)
    except HTTPException as e:
        return e
    
# http://localhost/data/test get요청 시 json으로 출력


# 스프링 컨트롤러에게 get요청


# 1. GET /api/resume/1 응답 JSON을 변수에 저장
def get_resume_data(resume_id: int) -> dict:
    # GET 요청을 보내고 응답을 받습니다.
    response = requests.get(f"http://api.example.com/api/resume/{resume_id}")

    # 응답이 성공적으로 받아졌는지 확인합니다.
    if response.status_code == 200:
        # JSON 형식의 응답을 딕셔너리로 변환하여 반환합니다.
        resume_data = response.json()
        return resume_data
    else:
        # 에러가 발생한 경우 예외를 발생시킵니다.
        raise Exception(
            f"Failed to fetch resume data. Status code: {response.status_code}"
        )


# 2. 지원 회사명에 따른 인재상 키워드 검색하여 변수에 저장.
# (POST 요청을 보내면서 body에 있는 company로 요청한 회사명으 사용하여 인재상 연관단어를 검색하여 나온 리스트를 변수에 저장)
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import concurrent.futures
import urllib.parse

app = FastAPI()


# POST 요청의 본문(JSON 데이터)를 처리하기 위한 모델 정의
class CompanyRequest(BaseModel):
    company: str
