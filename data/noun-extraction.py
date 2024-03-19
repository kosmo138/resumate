import requests
from bs4 import BeautifulSoup
from konlpy.tag import Komoran

def extract_nouns_from_website(url):
    # 1. 웹사이트에서 HTML 코드 가져오기
    response = requests.get(url)
    if response.status_code == 200:
        html = response.text
        # 2. HTML 코드 파싱
        soup = BeautifulSoup(html, 'html.parser')
        # 3. 텍스트 추출
        text = soup.get_text()
        # 4. 명사 추출
        komoran = Komoran()
        nouns = komoran.nouns(text)
        return nouns
    else:
        print("웹사이트에 접근할 수 없습니다.")
        return []

def main():
    # 추출하고자 하는 기업의 웹사이트 URL
    url = 'https://www.lgcns.com/'
    # 5. 추출된 명사 리스트 저장
    nouns = extract_nouns_from_website(url)
    print("추출된 명사:", nouns)
    # 추출된 명사들을 원하는 파일 형식으로 저장할 수 있습니다.

if __name__ == "__main__":
    main()

#======= Komoran이 사용하는 모델 파일의 설치 여부를 확인==============================
# from konlpy.tag import Komoran

# # Komoran 객체 생성
# komoran = Komoran()

# # 형태소 분석 시도
# result = komoran.pos("안녕하세요. 한국어 형태소 분석기 KoNLPy의 Komoran입니다.")

# # 결과 출력
# print(result)
