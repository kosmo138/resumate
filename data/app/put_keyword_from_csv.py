import csv
import time
import json
import os
import sys

import requests
from bs4 import BeautifulSoup
from konlpy.tag import Kkma
from gensim.models import Word2Vec
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support import expected_conditions as EC
from core.env import DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME
from selenium.webdriver.chrome.options import Options as ChromeOptions

# current_dir = os.path.dirname(os.path.abspath(__file__))
# # app.core 모듈이 있는 상위 디렉토리로 이동하여 sys.path에 추가합니다.
# sys.path.append(os.path.join(current_dir, '..', 'core'))

# sys.path.append(r'C:\Users\kosmo\Desktop\kosmo_baeksn\project3\resumate\data\app\core')
# from models import Keyword
from core.entity import Keyword
from core.database import session


class GoogleSearchScraper:

    def __init__(self, chrome_options):
        self.chrome_options = chrome_options
        self.driver = None

    def scroll_down_page(self):
        SCROLL_PAUSE_TIME = 2

        # Get scroll height
        last_height = self.driver.execute_script("return document.body.scrollHeight")

        while True:
            # Scroll down to bottom
            self.driver.execute_script(
                "window.scrollTo(0, document.body.scrollHeight);"
            )

            # Wait to load page
            time.sleep(SCROLL_PAUSE_TIME)

            # Calculate new scroll height and compare with last scroll height
            new_height = self.driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height
            # 새로운 스크롤 높이를 last_height로 설정하여 계속해서 스크롤을 진행

    def get_first_search_result_url(self, query):
        try:
            print("크롬 웹 드라이버를 실행합니다...")
            self.driver = webdriver.Chrome(options=self.chrome_options)
            print("구글 검색 페이지에 접근합니다...")
            self.driver.get(f"https://www.google.com/search?q={query}" + " 인재상")
            # self.scroll_down_page()  # 스크롤을 내립니다.
            print("첫 번째 항목의 URL을 가져오는 중...")
            # 일정 시간 동안 기다립니다.
            first_title = WebDriverWait(self.driver, 20).until(
                EC.presence_of_element_located(
                    (By.CSS_SELECTOR, "h3.LC20lb.MBeuO.DKV0Md")
                )
            )
            url = first_title.find_element(By.XPATH, "./parent::a").get_attribute(
                "href"
            )
            print("첫 번째 검색 결과 URL을 성공적으로 가져왔습니다.")
            print("첫 번째 검색 결과 URL:", url)
            return url
        except TimeoutException:
            print("Timeout occurred while waiting for element to load.")
            return None
        except Exception as e:
            print(f"검색 결과 URL을 가져오는 중 오류가 발생했습니다: {e}")
            return None
        finally:
            if self.driver:
                self.driver.quit()


# Word2Vec 모델 로드 및 관련 키워드 추출
class KeywordExtractor:
    def __init__(self, model_path):
        self.model_path = model_path
        self.model = self.load_word2vec_model()

    def load_word2vec_model(self):
        try:
            print("Word2Vec 모델을 로드하는 중...")
            model = Word2Vec.load(self.model_path)
            print("Word2Vec 모델을 성공적으로 로드했습니다.")
            return model
        except Exception as e:
            print("Error occurred while loading Word2Vec model:", e)
            return None

    def extract_related_keywords(self, nouns, target_words, threshold=0.6):
        related_keywords = set()
        for target_word in target_words:
            for noun in nouns:
                try:
                    similarity = self.model.wv.similarity(noun, target_word)
                    if similarity >= threshold:
                        related_keywords.add(noun)
                except KeyError:
                    pass
        return related_keywords


class TextAnalyzer:
    def __init__(self):
        self.kkma = Kkma()

    def extract_nouns_from_html(self, url):
        try:
            print("URL에서 HTML 내용을 가져옵니다...")
            response = requests.get(url, verify=False)
            html_text = response.text
            print("HTML 내용을 성공적으로 가져왔습니다.")
            print("HTML을 파싱합니다...")
            soup = BeautifulSoup(html_text, "html.parser")
            text = soup.get_text()
            print("HTML을 성공적으로 파싱했습니다.")
            print("명사를 추출합니다...")
            nouns = self.kkma.nouns(text)
            print("명사를 성공적으로 추출했습니다.")
            return nouns
        except Exception as e:
            print(f"명사를 추출하는 데 실패했습니다: {e}")
            return None


def extract_keywords(csv_file_path):
    # Word2Vec 모델 경로
    model_path = (
        r"C:\Users\kosmo\Desktop\kosmo_baeksn\project3\resumate\data\models\wiki.model"
    )
    # 목표 단어 리스트
    target_words = [
        "인재",
        "소통",
        "능력",
        "책임",
        "성실",
        "도전",
        "열정",
        "꿈",
        "사람",
        "다양",
        "창의",
        "혁신",
        "전문",
        "기술",
        "지식",
        "해결",
        "리더십",
        "팀워크",
        "목표",
        "정직",
        "도덕",
        "학습",
        "성장",
        "비전",
    ]

    # GoogleSearchScraper, KeywordExtractor, TextAnalyzer 객체 생성
    options = Options()
    options.add_argument(
        "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36"
    )
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    scraper = GoogleSearchScraper(options)
    extractor = KeywordExtractor(model_path)
    analyzer = TextAnalyzer()

    extracted_data = []

    try:
        with open(csv_file_path, "r", encoding="utf-8") as file:
            csv_reader = csv.reader(file)
            next(csv_reader)
            for row in csv_reader:
                if row:  # 빈 행이 아닌 경우에만 회사 이름 데이터를 가져옴
                    company_name = row[0]
                    print(f"Processing company: {company_name}")

                    # 회사 이름을 사용하여 검색 결과 URL 가져오기
                    url = scraper.get_first_search_result_url(company_name)
                    if url:
                        # URL에서 HTML 내용을 추출하여 명사 추출
                        nouns = analyzer.extract_nouns_from_html(url)
                        if nouns:
                            # 추출된 명사를 사용하여 관련 키워드 추출
                            related_keywords = extractor.extract_related_keywords(
                                nouns, target_words
                            )
                            if related_keywords:
                                print(
                                    f"Related keywords for {company_name}: {related_keywords}"
                                )
                                # 추출된 데이터를 딕셔너리 형태로 저장
                                company_data = {
                                    "company": company_name,
                                    "keywords": list(related_keywords),
                                }
                                extracted_data.append(company_data)
                            else:
                                print(f"No related keywords found for {company_name}")
                        else:
                            print(f"No nouns extracted from HTML for {company_name}")
                    else:
                        print(f"Failed to get search result URL for {company_name}")
    except Exception as e:
        print(f"An error occurred: {e}")

    return extracted_data


def insert_keyword(json_keywords):
    try:
        # JSON 데이터를 파이썬 객체로 변환
        extracted_data = json.loads(json_keywords)

        # 반복문을 통해 각 키워드 데이터를 데이터베이스에 추가
        for data in extracted_data:
            company = data.get("company")
            keywords = data.get("keywords")

            # Keyword 모델을 사용하여 새로운 키워드 객체 생성
            new_keyword = Keyword(
                company=company, keyword=json.dumps(keywords, ensure_ascii=False)
            )

            # 새로운 키워드를 세션에 추가
            session.add(new_keyword)

        # 세션에 추가된 모든 변경 사항을 데이터베이스에 커밋하여 저장
        session.commit()
        print("데이터베이스에 저장 중입니다...")
        print("저장 중인 데이터베이스:", extracted_data)
        print("데이터베이스 저장이 완료되었습니다.")
    except Exception as e:
        # 에러가 발생한 경우 에러 메시지 출력
        print(f"데이터베이스 저장 중 에러가 발생했습니다: {e}")


def main(csv_file_path):
    try:
        print("Extracting keywords from companies listed in the CSV file...")
        extracted_data = extract_keywords(csv_file_path)
        print("Keywords extraction completed.")
        # 추출된 데이터를 JSON 형식으로 출력
        # insert_keyword_results(extracted_data)
        json_keywords = json.dumps(extracted_data, indent=4, ensure_ascii=False)
        insert_keyword(json_keywords)

    except Exception as e:
        print(f"An error occurred during keyword extraction: {e}")


if __name__ == "__main__":
    csv_file_path = "companies.csv"  # CSV 파일 경로
    main(csv_file_path)
