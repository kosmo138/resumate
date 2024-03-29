from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import requests
from konlpy.tag import Hannanum
from gensim.models import Word2Vec
import pandas as pd
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import TimeoutException


class GoogleSearchScraper:
    def __init__(self, chrome_options):
        self.chrome_options = chrome_options
    
    def get_first_search_result_url(self, query):
        # Chrome 옵션을 설정하여 WebDriver 초기화
        driver = webdriver.Chrome(options=self.chrome_options)
        driver.get(f"https://www.google.com/search?q={query}" + " 인재상")
        
        try:
            print("검색 결과 페이지에서 첫 번째 항목의 URL을 가져오는 중...")
            first_title = WebDriverWait(driver, 20).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "h3.LC20lb.MBeuO.DKV0Md"))
            )
            url = first_title.find_element(By.XPATH, "./parent::a").get_attribute("href")
            print("첫 번째 항목 URL을 성공적으로 가져왔습니다.")
        except Exception as e:
            print("Error occurred while getting the first search result URL:", e)
            url = None
        finally:
            driver.quit()
        
        return url


class TextAnalyzer:
    def __init__(self):
        self.hannanum = Hannanum()

    def extract_nouns_from_html(self, url):
        print("명사 추출 중...")
        print("사이트 주소:", url)  # 사이트 주소 출력
        try:
            # SSL 인증서의 유효성을 확인하여 요청
            response = requests.get(url, verify=True)
            response.raise_for_status()  # HTTP 오류를 발생시키지 않는다면, 이 코드는 아무런 효과가 없다.
        except requests.exceptions.SSLError as e:
            print("SSL 인증서 유효성 확인에 실패했습니다:", e)
            return None
        except requests.exceptions.RequestException as e:
            print("요청에 실패했습니다:", e)
            return None

        if response.status_code != 200:
            print("HTML 가져오기에 실패했습니다. 상태 코드:", response.status_code)
            return None

        response.encoding = response.apparent_encoding
        html = response.text

        try:
            soup = BeautifulSoup(html, "html.parser")
            # 텍스트 추출
            text = soup.get_text()
        except Exception as e:
            print("HTML 파싱에 실패했습니다:", e)
            return None

        try:
            # 일정 시간동안 명사 추출 시도
            nouns = WebDriverWait(self.hannanum.nouns, timeout=10).until(
                lambda driver: self.hannanum.nouns(text)
            )
            print("명사 추출 완료.")
            return nouns
        except TimeoutException:
            print("명사 추출에 실패하였습니다: 시간 초과")
            return None

    

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
        for word in target_words:
            for noun in nouns:
                try:
                    similarity = self.model.wv.similarity(noun, word)
                    if similarity >= threshold:
                        related_keywords.add(noun)
                except KeyError:
                    pass
        return related_keywords


def main():
    query = input("검색어를 입력하세요: ")

    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36")
    chrome_options.add_argument("headless")

    scraper = GoogleSearchScraper(chrome_options)
    first_url = scraper.get_first_search_result_url(query)

    if first_url:
        analyzer = TextAnalyzer()
        nouns = analyzer.extract_nouns_from_html(first_url)
        if nouns is not None:
            print("추출된 명사의 개수:", len(nouns))

            extractor = KeywordExtractor(model_path="wiki.model")
            if extractor.model:
                target_words = ["인재", "소통", "능력", "책임", "성실", "도전", "열정", "꿈", "사람"]
                related_keywords = extractor.extract_related_keywords(nouns, target_words)

                print("인재상에 해당하는 키워드:", len(related_keywords), "개")
                df = pd.DataFrame({"인재상에 해당하는 키워드(중복제거)": list(related_keywords)})
                print(df)
            else:
                print("Word2Vec 모델을 로드하지 못했습니다. 모델 경로를 확인하세요.")
        else:
            print("사이트에서 명사를 추출할 수 없습니다.")
    else:
        print("검색 결과 URL을 가져오지 못했습니다.")


if __name__ == "__main__":
    main()
