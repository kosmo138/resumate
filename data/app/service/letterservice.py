import json
import requests
from concurrent.futures import ThreadPoolExecutor, TimeoutError
from fastapi import HTTPException
from app.core.models import Resume, Letter


class LetterService:
    def main(self, authorization: str, letter: Letter):
        resume = self.get_resume_by_id(authorization, letter.resume_id)
        resume_json = json.dumps(resume)
        return resume_json

    def thread_main(self, authorization: str, letter: Letter) -> str:
        with ThreadPoolExecutor() as executor:
            try:
                future = executor.submit(self.main, authorization, letter)
                return future.result(timeout=30)
            except TimeoutError:
                raise HTTPException(
                    status_code=408, detail="요청 시간이 초과되었습니다"
                )
            except Exception:
                raise HTTPException(status_code=500, detail="서버 오류가 발생했습니다")

    def get_resume_by_id(self, authorization: str, resume_id: int) -> Resume:
        if len(authorization) == 0 or authorization is None:
            raise HTTPException(status_code=401, detail="로그인이 필요합니다")
        url: str = f"http://host.docker.internal/api/resume/{resume_id}"
        headers: dict = {"Authorization": authorization}
        response = requests.get(url=url, headers=headers)
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(
                status_code=response.status_code,
                detail="이력서 정보 가져오기에 실패했습니다",
            )
