from langchain.chains import LLMChain
from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from app.core.env import OPENAI_API_KEY
import json

if __name__ == "__main__":
    # 이력서 정보와 키워드 정보
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

    # 이력서 데이터와 키워드 데이터를 JSON 형식으로 변환
    resume_json = json.dumps(resume_data)
    keyword_json = json.dumps(keyword_data)

    # 프롬프트 템플릿을 생성
    template = """이력서 정보:
    이름: {name}
    이메일: {email}
    학력:
    - 학위: {education_degree}
    - 전공: {education_major}
    - 대학: {education_university}
    - 졸업 연도: {education_graduation_year}
    경력:
    - 직책: {experience_title}
    - 회사: {experience_company}
    - 설명: {experience_description}

    키워드 정보:
    키워드: {keywords}

    이 정보를 바탕으로 한글로 자기소개서 초안을 작성해주세요."""
    prompt = PromptTemplate.from_template(template)

    # OpenAI 객체 생성
    llm = OpenAI(openai_api_key=OPENAI_API_KEY)
    llm_chain = LLMChain(prompt=prompt, llm=llm)

    # 질문 입력
    question = ""

    # LLMChain을 사용하여 자기소개서 초안 생성
    output = llm_chain.run(
        name=resume_data["name"],
        email=resume_data["email"],
        education_degree=resume_data["education"][0]["degree"],
        education_major=resume_data["education"][0]["major"],
        education_university=resume_data["education"][0]["university"],
        education_graduation_year=resume_data["education"][0]["graduation_year"],
        experience_title=resume_data["experience"][0]["title"],
        experience_company=resume_data["experience"][0]["company"],
        experience_description=resume_data["experience"][0]["description"],
        keywords=", ".join(keyword_data["keywords"]),
    )

    print(output)
