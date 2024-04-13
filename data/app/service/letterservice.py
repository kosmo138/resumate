import requests
import concurrent.futures
from fastapi import HTTPException
from app.core.models import Letter


class LetterService:
    def post_letter(self, authorization: str, letter: Letter) -> str:
        args = (authorization, letter)
        with concurrent.futures.ThreadPoolExecutor() as executor:
            future = executor.submit(self.get_resume_by_id, *args)
            try:
                return future.result(timeout=30)
            except concurrent.futures.TimeoutError:
                raise HTTPException(status_code=408, detail="요청 시간 초과")
    def get_resume_by_id(authorization: str, letter: Letter) -> str:
        if authorization is None:
                raise HTTPException(status_code=401, detail="로그인이 필요합니다")
        try:
            headers = {"Authorization": authorization}
            response = requests.get(
                f"http://localhost/api/resume/{letter.resume_id}", headers=headers
            )
            if response.status_code == 200:
                return response.json()
            else:
                raise HTTPException(
                    status_code=response.status_code, detail="이력서 정보 조회 실패"
                )
        except ConnectionError as e:
            print(e)