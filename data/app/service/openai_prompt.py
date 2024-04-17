import yaml
import json
from fastapi import HTTPException
from langchain.chains import LLMChain
from langchain_openai import OpenAI
from langchain_core.prompts import PromptTemplate
from app.core.env import OPENAI_API_KEY
from app.core.models import Resume, Letter


class OpenaiPrompt:
    def __init__(self, resume: Resume, letter: Letter, keyword: list[str]):
        self.resume = resume
        self.letter = letter
        self.keyword = keyword

    def draft_letter(self):
        resume_yaml: str = yaml.dump(self.resume, allow_unicode=True)
        keyword_json: str = json.dumps(self.keyword[0:4], ensure_ascii=False)
        template = (
            "아래의 이력서를 통해 자기소개서 중 {category}의 초안을 500자 작성해 줘\n"
            "\n"
            "[회사명] {company}\n"
            "[지원 직무] {job}\n"
            "[포함할 키워드] {keyword}\n"
            "\n"
            "[이력서]\n"
            "{resume}\n"
        )
        try:
            prompt_template = PromptTemplate(
                template=template,
                input_variables=["category", "company", "job", "keyword", "resume"],
            )
            llm = OpenAI(openai_api_key=OPENAI_API_KEY)
            chain = LLMChain(prompt=prompt_template, llm=llm)
            result = chain.run(
                category=self.letter.category,
                company=self.letter.company,
                job=self.letter.job,
                keyword=keyword_json,
                resume=resume_yaml,
            )
            return result

        except Exception:
            raise HTTPException(
                status_code=500, detail="ChatGPT 요청 도중 오류가 발생했습니다"
            )

    def modify_letter(self):
        template = (
            "아래의 초안을 토대로 자기소개서를 수정해 줘\n"
            "\n"
            "[초안]\n"
            "{letter}\n"
            "\n"
            "[수정 사항]\n"
            "{command}\n"
        )
        try:
            prompt_template = PromptTemplate(
                template=template,
                input_variables=["letter", "command"],
            )
            llm = OpenAI(openai_api_key=OPENAI_API_KEY)
            chain = LLMChain(prompt=prompt_template, llm=llm)
            result = chain.run(
                letter=self.letter.letter,
                command=self.letter.command,
            )

            # 수정된 자기소개서만 추출
            modified_intro = result.split("[수정사항]")[1].strip()
            return modified_intro

        except Exception:
            raise HTTPException(
                status_code=500, detail="ChatGPT 요청 도중 오류가 발생했습니다"
            )
