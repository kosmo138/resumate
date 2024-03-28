from bs4 import BeautifulSoup
import requests
from konlpy.tag import Hannanum

# 명사만 추출하는 함수 정의
def extract_nouns_from_html(url):
    # 웹사이트의 HTML 코드 가져오기
    response = requests.get(url)
    # 인코딩 설정
    response.encoding = response.apparent_encoding
    html = response.text

    # BeautifulSoup을 사용하여 HTML 파싱
    soup = BeautifulSoup(html, "html.parser")

    # HTML에서 텍스트 추출
    text = soup.get_text()
    # Hannanum 형태소 분석기 초기화
    hannanum = Hannanum()
    # 명사만 추출하여 리스트에 저장
    nouns = hannanum.nouns(text)
    return nouns

# 특정 사이트 URL
# url = "https://www.lgcns.com/careers/who-we-are/"   
# url = "https://www.samsungsvc.co.kr/intro/recruitment"  
# url = "https://www.samsungsds.com/kr/unsdgs/values.html" 
url = "https://www.lge.co.kr/company/recruit/talent" 
# url = "https://www.sk.co.kr/ko/careers/person.jsp" 
# url = "https://www.skhynix.com/careers/UI-FR-CR01/" 

# 명사만 추출
nouns = extract_nouns_from_html(url)

# 중복 제거를 위해 set으로 변환 후 출력
unique_nouns = set(nouns)
for noun in unique_nouns:
    print(noun)
