from fastapi import Header
import requests
from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.get("/{resume_id}")
async def get_resume(resume_id: int, authorization: str = Header(None)):
    if authorization is None:
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        headers = {"Authorization": authorization}
        response = requests.get(
            f"http://localhost/api/resume/{resume_id}", headers=headers
        )
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(
                status_code=response.status_code, detail="GET request failed"
            )
    except ConnectionError as e:
        print(e)
