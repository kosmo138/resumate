# ======특정 사이트에 대한 html코드에서 명사만 추출하는 기능 코드=====================
from bs4 import BeautifulSoup
import requests
from konlpy.tag import Komoran

# 명사만 추출하는 함수 정의
def extract_nouns_from_html(url):
    # 웹사이트의 HTML 코드 가져오기
    html = requests.get(url).text
    # BeautifulSoup을 사용하여 HTML 파싱
    soup = BeautifulSoup(html, "html.parser")
    # HTML에서 텍스트 추출
    text = soup.get_text()
    # Komoran 형태소 분석기 초기화
    komoran = Komoran()
    # 명사만 추출하여 리스트에 저장
    nouns = komoran.nouns(text)
    return nouns

# 특정 사이트 URL
# url = "https://www.lgcns.com/careers/who-we-are/"   #오류
# url = "https://www.samsungsvc.co.kr/intro/recruitment"  #ok
# url = "https://www.samsungsds.com/kr/unsdgs/values.html" #오류
# url = "https://www.lge.co.kr/company/recruit/talent" #오류
# url = "https://www.sk.co.kr/ko/careers/person.jsp" #ok
url = "https://www.skhynix.com/careers/UI-FR-CR01/" #ok

# 명사만 추출
nouns = extract_nouns_from_html(url)

# 중복 제거를 위해 set으로 변환 후 출력
unique_nouns = set(nouns)
for noun in unique_nouns:
    print(noun)
