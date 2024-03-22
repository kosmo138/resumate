from konlpy.tag import Komoran
import requests
from bs4 import BeautifulSoup

def get_html(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.text
        else:
            print("요청이 실패했습니다. 상태 코드:", response.status_code)
            return None
    except Exception as e:
        print("오류 발생:", e)
        return None

def main():
    url = "https://www.naver.com"
    html_code = get_html(url)
    if html_code:
        # HTML 코드를 BeautifulSoup으로 파싱하여 텍스트 추출
        soup = BeautifulSoup(html_code, 'html.parser')
        # 스크립트와 스타일 태그를 제거합니다.
        for script in soup(["script", "style"]):
            script.decompose()
        # 텍스트 추출
        text = soup.get_text()
        # 줄 바꿈과 공백 제거
        lines = (line.strip() for line in text.splitlines())
        # 빈 줄 제거
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        # 텍스트 조합
        text = '\n'.join(chunk for chunk in chunks if chunk)
        
        # 코모란 형태소 분석기 초기화
        komoran = Komoran()
        
        # HTML 코드에서 명사만 추출
        nouns = komoran.nouns(text)
        
        # 중복 제거
        unique_nouns = list(set(nouns))
        print("웹 페이지에서 중복을 제거한 명사:", unique_nouns)
        

if __name__ == "__main__":
    main()
