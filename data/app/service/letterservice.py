import json
import requests
from concurrent.futures import ThreadPoolExecutor, TimeoutError
from fastapi import HTTPException
from app.core.models import Letter


class LetterService:
    def post_letter(self, authorization: str, letter: Letter) -> str:
        args = (authorization, letter)
        with ThreadPoolExecutor() as executor:
            try:
                future = executor.submit(self.get_resume_by_id, *args)
                result = future.result(timeout=30)
                return json.dumps(result)
            except TimeoutError:
                raise HTTPException(
                    status_code=408, detail="요청 시간이 초과되었습니다"
                )

    def get_resume_by_id(self, authorization: str, letter: Letter) -> str:
        if authorization is None:
            raise HTTPException(status_code=401, detail="로그인이 필요합니다")
        url: str = f"http://host.docker.internal/api/resume/{letter.resume_id}"
        headers: dict = {"Authorization": authorization}
        response = requests.get(url=url, headers=headers)
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(
                status_code=response.status_code,
                detail="이력서 정보 가져오기에 실패했습니다",
            )
