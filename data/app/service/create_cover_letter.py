import asyncio
from openai import BaseModel
from app.core.env import OPENAI_API_KEY
import json
import requests
from fastapi import FastAPI, HTTPException
from langchain.chains import LLMChain
from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from app.core.env import OPENAI_API_KEY  
import json
import requests
import app
from service.keywordservice import thread_search_keyword

# 1. GET /api/resume/1 응답 JSON을 변수에 저장
#   헤더 JWT 그대로 전달
# 사용자의 토큰
token = 'eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6IjFAdGVzdC5jb20iLCJpYXQiOjE3MTI4MDQwMDUsImV4cCI6MTcxMjgyNTYwNX0.YiuZwoF2ovs-ysTyZj-aQAJ3isHXO_lYbldCPiUPD77TlSxLnhM1lVicsFDwXp_g7fzS1JXB174mqA7sqiL8ng'

# GET 요청을 보냅니다.
# GET 요청을 보낼 때 클라이언트 측에서 서버로 JWT를 전달.
headers = {'Authorization': f'Bearer {token}'}  # 토큰을 헤더에 포함합니다.
response = requests.get('http://localhost/api/resume/2', headers=headers)

# 응답 상태 코드를 확인합니다.
if response.status_code == 200:
    # 응답 JSON을 디코딩하여 파이썬 객체로 변환합니다.
    resume_data = response.json()
    # 응답 데이터를 출력합니다.
    print(resume_data)
else:
    # 요청이 실패한 경우 오류 메시지를 출력합니다.
    print('GET request failed with status code:', response.status_code)


# 2. 지원 회사명에 따른 인재상 키워드 검색하여 변수에 저장

class LetterData(BaseModel):
    resume_id: int
    job: str
    company: str
    category: str
    text: str
    command: str

@app.post("/data/letter/edit")
async def get_company(data: LetterData):
    # 입력 받은 회사명(company)을 thread_search_keyword 함수에 전달하여 결과를 받습니다.
    company = data.company
    keywords_result = thread_search_keyword(company)
    company_keywords = json.dumps(keywords_result)
    
    return company_keywords

# 3. 위의 2개 문자열을 요청 Body에 합쳐 OpenAI API에 POST 요청
# resume_data, keyword_result의 데이터와 body의 데이터를 합쳐 llmchain을 활용해서 자기소개서 초안 작성 요청
from fastapi import FastAPI
from langchain.chains import LLMChain
from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from app.core.env import OPENAI_API_KEY
import json

app = FastAPI()

# OpenAI API 설정
openai_api_key = "YOUR_OPENAI_API_KEY_HERE"

# 자기소개서 초안을 생성하는 함수
async def generate_cover_letter(resume_data, company_keywords, openai_api_key):
    # 프롬프트 템플릿 정의
    template = """
    Resume Data: {resume_data}
    Company Keywords: {company_keywords}
    Job: {job}
    Category: {category}
    Text: {text}
    Command: {command}
    """

    # PromptTemplate을 사용하여 프롬프트 생성
    prompt = PromptTemplate.from_template(template)

    # OpenAI 객체 생성
    llm = OpenAI(openai_api_key=openai_api_key)
    llm_chain = LLMChain(prompt=prompt, llm=llm)

     # LLMChain 객체를 사용하여 자기소개서 초안 생성
    try:
        # 20초 동안 llmchain의 응답을 대기하고 TimeoutError를 발생시킵니다.
        output = await asyncio.wait_for(llm_chain.run(resume_data=resume_data, company_keywords=company_keywords), timeout=20)
        return output
    except asyncio.TimeoutError:
        raise TimeoutError("LLMChain response timed out after 20 seconds")

@app.post("/data/letter")
async def process_letter(resume_data: dict, job: str, company: str, category: str, text: str, command: str):
    # 입력 받은 회사명(company)을 thread_search_keyword 함수에 전달하여 결과를 받습니다.
    company = get_company(company)
    
    # 텍스트가 비어 있는 경우와 비어 있지 않은 경우를 처리합니다.
    if not text:
        # 텍스트가 비어 있을 때
        # 자기소개서 초안 작성 요청
        cover_letter_draft = generate_cover_letter(resume_data, thread_search_keyword(company), openai_api_key)
    else:
        # 텍스트가 비어 있지 않을 때
        # 자기소개서 초안 작성 요청 (텍스트와 커맨드 포함)
        cover_letter_draft = generate_cover_letter(resume_data, thread_search_keyword(company), openai_api_key, text, command)
    
    return cover_letter_draft

