from bs4 import BeautifulSoup
import requests
from konlpy.tag import Kkma
from gensim.models import Word2Vec
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options as ChromeOptions
import time

# HTML에서 텍스트 추출 및 명사 추출
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

# Google 검색을 통해 첫 번째 검색 결과 URL 획득
class GoogleSearchScraper:
    def __init__(self, options):
        self.chrome_options = options

    def scroll_down_page(self, driver):
        SCROLL_PAUSE_TIME = 2

        # Get scroll height
        last_height = driver.execute_script("return document.body.scrollHeight")

        while True:
            # Scroll down to bottom
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

            # Wait to load page
            time.sleep(SCROLL_PAUSE_TIME)

            # Calculate new scroll height and compare with last scroll height
            new_height = driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height

    def get_first_search_result_url(self, query):
        try:
            print("크롬 웹 드라이버를 실행합니다...")
            driver = webdriver.Chrome(options=self.chrome_options)
            print("구글 검색 페이지에 접근합니다...")
            driver.get(f"https://www.google.com/search?q={query}" + " 인재상")
            self.scroll_down_page(driver)  # 스크롤을 내립니다.
            print("첫 번째 항목의 URL을 가져오는 중...")
            first_title = WebDriverWait(driver, 20).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "h3.LC20lb.MBeuO.DKV0Md"))
            )
            url = first_title.find_element(By.XPATH, "./parent::a").get_attribute("href")
            print("첫 번째 검색 결과 URL을 성공적으로 가져왔습니다.")
            print("첫 번째 검색 결과 URL:", url)
            return url
        except Exception as e:
            print(f"검색 결과 URL을 가져오는 중 오류가 발생했습니다: {e}")
            return None
        finally:
            driver.quit()

def main():
    query = input("검색어를 입력하세요: ")

    options = ChromeOptions()
    options.add_argument(
        "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36"
    )
    options.add_argument("--headless")

    scraper = GoogleSearchScraper(options)
    first_url = scraper.get_first_search_result_url(query)

    if first_url:
        analyzer = TextAnalyzer()
        nouns = analyzer.extract_nouns_from_html(first_url)
        if nouns is not None:
            print("추출된 명사의 개수:", len(nouns))

            extractor = KeywordExtractor(model_path="wiki.model")
            if extractor.model:
                target_words = ["인재", "소통", "능력", "책임", "성실", "도전", "열정", "꿈", "사람", "다양", "창의", "혁신", "전문", "기술", "지식", "해결", "리더십", "팀워크", "목표", "정직", "도덕", "학습", "성장", "비전"]
                related_keywords = extractor.extract_related_keywords(nouns, target_words)

                print("인재상에 해당하는 키워드:", len(related_keywords), "개")
                df = pd.DataFrame(
                    {"인재상에 해당하는 키워드(중복제거)": list(related_keywords)}
                )
                print(df)
            else:
                print("Word2Vec 모델을 로드하지 못했습니다. 모델 경로를 확인하세요.")
        else:
            print("사이트에서 명사를 추출할 수 없습니다.")
    else:
        print("검색 결과 URL을 가져오지 못했습니다.")

if __name__ == "__main__":
    main()
