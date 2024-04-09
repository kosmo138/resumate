from langchain.chains import LLMChain
from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from app.core.env import OPENAI_API_KEY
import json


# 자기소개서 초안 작성 함수
def generate_cover_letter(resume_data, keyword_data, openai_api_key):
    # resume_data와 keyword_data를 JSON 형식의 문자열로 변환
    resume_json = json.dumps(resume_data)
    keyword_json = json.dumps(keyword_data)

    # 프롬프트 템플릿 정의
    template = """
    Resume Data: {resume_json}
    Keyword Data: {keyword_json}
    """

    # PromptTemplate을 사용하여 프롬프트 생성
    prompt = PromptTemplate.from_template(template)

    # OpenAI 객체 생성
    llm = OpenAI(openai_api_key=OPENAI_API_KEY)
    llm_chain = LLMChain(prompt=prompt, llm=llm)

    # 질문 입력
    # question = "Write a cover letter using the provided data."

    # LLMChain 객체를 사용하여 자기소개서 초안 생성
    output = llm_chain.run(resume_json=resume_json, keyword_json=keyword_json)

    return output


if __name__ == "__main__":
    resume_data = {
        "name": "홍길동",
        "email": "hong@example.com",
        "education": [
            {
                "degree": "학사",
                "major": "컴퓨터 공학",
                "university": "가나다 대학교",
                "graduation_year": 2022,
            }
        ],
        "experience": [
            {
                "title": "인턴",
                "company": "삼성전자",
                "description": "소프트웨어 개발 업무 수행",
            }
        ],
    }

    keyword_data = {
        "keywords": ["창의적", "리더십", "문제해결능력", "협업", "커뮤니케이션"]
    }

    cover_letter_draft = generate_cover_letter(
        resume_data, keyword_data, OPENAI_API_KEY
    )
    print(cover_letter_draft)
