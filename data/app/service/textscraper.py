import requests
from bs4 import BeautifulSoup
from fastapi import HTTPException


class TextScraper:

    def get_href(self, company: str):
        url = f"https://www.google.com/search?q={company}" + " 인재상"
        user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
        try:
            response = requests.get(
                url=url,
                headers={"User-Agent": user_agent},
            )
            soup = BeautifulSoup(response.text, "html.parser")
            first_title = soup.select_one("h3.LC20lb.MBeuO.DKV0Md")
            url = first_title.find_parent("a")["href"]
            return url
        except Exception:
            raise HTTPException(
                status_code=500, detail="URL을 가져오는 데 실패했습니다."
            )

    def get_text(self, url):
        try:
            response = requests.get(url, verify=False)
            html_text = response.text
            soup = BeautifulSoup(html_text, "html.parser")
            text = soup.get_text()
            return text
        except Exception:
            raise HTTPException(
                status_code=500, detail="텍스트를 가져오는 데 실패했습니다."
            )
