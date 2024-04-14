import requests
import json
from concurrent.futures import ThreadPoolExecutor, TimeoutError
from fastapi import HTTPException
from app.core.models import Resume, Letter
from app.service.keywordservice import KeywordService


class LetterService:
    def __init__(self, authorization: str = ""):
        self.keyword_service = KeywordService()
        self.authorization = authorization

    def main(self, letter: Letter) -> str:
        resume = self.get_resume_by_id(letter.resume_id)
        company_keyword = self.keyword_service.thread_search_keyword(letter.company)
        resume['company_keyword'] = company_keyword
        resume_json = json.dumps(resume)
        return resume_json

    def thread_main(self, letter: Letter) -> str:
        with ThreadPoolExecutor() as executor:
            try:
                thread = executor.submit(self.main, letter)
                result = thread.result(timeout=30)
                return result
            except TimeoutError:
                raise HTTPException(
                    status_code=408, detail="요청 시간이 초과되었습니다"
                )
            except Exception:
                raise HTTPException(status_code=500, detail="자기소개서 서비스에서 오류가 발생했습니다")
            finally:
                executor.shutdown(wait=False)
                del self

    def get_resume_by_id(self, resume_id: int) -> Resume:
        if self.authorization == "":
            raise HTTPException(status_code=401, detail="로그인이 필요합니다")
        url: str = f"http://host.docker.internal/api/resume/{resume_id}"
        headers: dict = {"Authorization": self.authorization}
        response = requests.get(url=url, headers=headers)
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(
                status_code=response.status_code,
                detail="이력서 정보 가져오기에 실패했습니다",
            )

