# import asyncio
# from openai import BaseModel
# from app.core.env import OPENAI_API_KEY
# import json
import requests
from fastapi import FastAPI, HTTPException

# from langchain.chains import LLMChain
# from langchain_core.prompts import PromptTemplate
# from langchain_openai import OpenAI
# from app.core.env import OPENAI_API_KEY
# import json
import requests
import app

# from service.keywordservice import thread_search_keyword

# 1. GET /api/resume/1 응답 JSON을 변수에 저장
#   헤더 JWT 그대로 전달
# 사용자의 토큰
token = "eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6IjFAdGVzdC5jb20iLCJpYXQiOjE3MTI5MDExMzMsImV4cCI6MTcxMjkyMjczM30.wVyz5PbXF1qMAzjEwckxQQ3twxTmmZjXLUSkJ6J9Chr2JABfCBRVxFmobX8IAsoK7690YOLN1qN9S3T_GqEIiQ"

# GET 요청을 보냅니다.
# GET 요청을 보낼 때 클라이언트 측에서 서버로 JWT를 전달.
from fastapi import FastAPI, HTTPException, Header
import requests

app = FastAPI()


@app.get("/resume/{resume_id}")
async def get_resume(resume_id: int, authorization: str = Header(None)):
    # 헤더에 포함된 토큰을 가져옵니다.
    if authorization is None:
        raise HTTPException(status_code=401, detail="Unauthorized")

    # 토큰을 헤더에 포함하여 GET 요청을 보냅니다.
    headers = {"Authorization": authorization}
    response = requests.get(f"http://localhost/api/resume/{resume_id}", headers=headers)

    # 응답 상태 코드를 확인합니다.
    if response.status_code == 200:
        # 응답 JSON을 반환합니다.
        return response.json()
    else:
        # 요청이 실패한 경우 HTTP 예외를 발생시킵니다.
        raise HTTPException(
            status_code=response.status_code, detail="GET request failed"
        )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="192.168.0.39", port=8000)


# # 2. 지원 회사명에 따른 인재상 키워드 검색하여 변수에 저장

# class LetterData(BaseModel):
#     resume_id: int
#     job: str
#     company: str
#     category: str
#     text: str
#     command: str

# @app.post("/data/letter/edit")
# async def get_company(data: LetterData):
#     # 입력 받은 회사명(company)을 thread_search_keyword 함수에 전달하여 결과를 받습니다.
#     company = data.company
#     keywords_result = thread_search_keyword(company)
#     company_keywords = json.dumps(keywords_result)

#     return company_keywords

# # 3. 위의 2개 문자열을 요청 Body에 합쳐 OpenAI API에 POST 요청
# # resume_data, keyword_result의 데이터와 body의 데이터를 합쳐 llmchain을 활용해서 자기소개서 초안 작성 요청
# from fastapi import FastAPI
# from langchain.chains import LLMChain
# from langchain_core.prompts import PromptTemplate
# from langchain_openai import OpenAI
# from app.core.env import OPENAI_API_KEY
# import json

# app = FastAPI()

# # OpenAI API 설정
# openai_api_key = "YOUR_OPENAI_API_KEY_HERE"

# # 자기소개서 초안을 생성하는 함수
# async def generate_cover_letter(resume_data, company_keywords, openai_api_key):
#     # 프롬프트 템플릿 정의
#     template = """
#     Resume Data: {resume_data}
#     Company Keywords: {company_keywords}
#     Job: {job}
#     Category: {category}
#     Text: {text}
#     Command: {command}
#     """

#     # PromptTemplate을 사용하여 프롬프트 생성
#     prompt = PromptTemplate.from_template(template)

#     # OpenAI 객체 생성
#     llm = OpenAI(openai_api_key=openai_api_key)
#     llm_chain = LLMChain(prompt=prompt, llm=llm)

#      # LLMChain 객체를 사용하여 자기소개서 초안 생성
#     try:
#         # 20초 동안 llmchain의 응답을 대기하고 TimeoutError를 발생시킵니다.
#         output = await asyncio.wait_for(llm_chain.run(resume_data=resume_data, company_keywords=company_keywords), timeout=20)
#         return output
#     except asyncio.TimeoutError:
#         raise TimeoutError("LLMChain response timed out after 20 seconds")

# @app.post("/data/letter")
# async def process_letter(resume_data: dict, job: str, company: str, category: str, text: str, command: str):
#     # 입력 받은 회사명(company)을 thread_search_keyword 함수에 전달하여 결과를 받습니다.
#     company = get_company(company)

#     # 텍스트가 비어 있는 경우와 비어 있지 않은 경우를 처리합니다.
#     if not text:
#         # 텍스트가 비어 있을 때
#         # 자기소개서 초안 작성 요청
#         cover_letter_draft = generate_cover_letter(resume_data, thread_search_keyword(company), openai_api_key)
#     else:
#         # 텍스트가 비어 있지 않을 때
#         # 자기소개서 초안 작성 요청 (텍스트와 커맨드 포함)
#         cover_letter_draft = generate_cover_letter(resume_data, thread_search_keyword(company), openai_api_key, text, command)

#     return cover_letter_draft
