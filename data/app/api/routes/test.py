from fastapi import Header
import requests
from fastapi import APIRouter, HTTPException

router = APIRouter()


# ====FastAPI에서 JWT(Jason Web Token)를 헤더에서 받는 방법====
@router.get("/")
def get_keyword(authorization: str = Header(...)):
    try:
        # JWT 파싱 및 처리
        jwt_token = authorization  # "Bearer" 부분 제거하지 않고 그대로 전달.
        # company = urllib.parse.unquote(company)
        return jwt_token
    except HTTPException as e:
        return e
    

    
# ====http://localhost/data/test get요청 시 json으로 출력====
@router.get("/test")
def get_test_json(authorization: str = Header(...)):  #authorization: str는 함수에 전달되는 매개변수 이름, Header(...)는 해당 매개변수의 기본값
    # 헤더에 있는 값을 가져오는 FastAPI의 헬퍼 함수
    # 헤더에서 "Authorization" 키의 값을 가져오라는 뜻
    try:
        # 여기에 필요한 로직을 추가합니다.
        # 예를 들어, 인증 절차를 수행하고 데이터를 가져오는 등의 작업을 수행할 수 있습니다.

        # 임시적으로 JSON 데이터를 생성하여 반환하는 예시
        data = {"message": "This is a test"}
        
        # JSONResponse를 사용하여 JSON 형식의 응답을 반환합니다.
        return JSONResponse(content=data)
    except Exception as e:
        # 예외 발생 시 500 Internal Server Error를 반환합니다.
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/test")
async def get_test_data():
    # 원하는 데이터를 딕셔너리 형태로 정의합니다.
    data = {
        "message": "This is a test message",
        "status": "success"
    }
    # 딕셔너리를 반환하면 FastAPI가 자동으로 JSON으로 변환하여 응답합니다.
    return data





# ====스프링 컨트롤러에게 get요청====


# ====GET /api/resume/1 응답 JSON을 변수에 저장====
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


# 인증 토큰
jwt_token = "your_jwt_token_here"

# GET 요청을 보낼 URL
url = "http://localhost/api/resume/1"

# 요청 헤더에 인증 토큰을 포함하여 GET 요청 보내고 응답 JSON을 변수에 저장
headers = {"Authorization": f"Bearer {jwt_token}"}
response = requests.get(url, headers=headers)

# 응답 JSON을 변수에 저장
resume_data = response.json()

# 저장된 JSON 출력
print(resume_data)


# ====지원 회사명에 따른 인재상 키워드 검색하여 변수에 저장====
# (POST 요청을 보내면서 body에 있는 company로 요청한 회사명으 사용하여 인재상 연관단어를 검색하여 나온 리스트를 변수에 저장)
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import concurrent.futures
import urllib.parse

app = FastAPI()


# ====POST 요청의 본문(JSON 데이터)를 처리하기 위한 모델 정의====
class CompanyRequest(BaseModel):
    company: str
