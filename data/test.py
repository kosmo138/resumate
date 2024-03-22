from bs4 import BeautifulSoup
import requests
from konlpy.tag import Komoran
from selenium import webdriver


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

# 검색을 받아 첫번째 url주소를 추출
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def get_first_search_result_url(query):
    # 웹드라이버 초기화
    driver = webdriver.Chrome()
    
    # Google 검색 페이지 열기
    driver.get(f"https://www.google.com/search?q={query}")
    
    # 첫 번째 검색 결과 제목의 URL 가져오기
    try:
        first_title = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'h3.LC20lb.MBeuO.DKV0Md'))
        )
        url = first_title.find_element(By.XPATH, './parent::a').get_attribute('href')
    except:
        url = None
    
    # 웹드라이버 종료
    driver.quit()
    
    return url

query = input("검색어를 입력하세요: ")
first_url = get_first_search_result_url(query)
print("첫 번째 검색 결과 제목의 URL:", first_url)

# 중복 제거를 위해 set으로 변환 후 출력
final_nouns = list(extract_nouns_from_html(first_url))
unique_nouns = set(final_nouns)
for noun in unique_nouns:
    print(noun)