from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service as ChromeService
import requests
from bs4 import BeautifulSoup
from konlpy.tag import Kkma


class TextScraper:
    def __init__(self):
        self.options = Options()
        self.options.add_argument(
            "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36"
        )
        self.options.add_argument("--headless")
        self.options.add_argument("--disable-gpu")
        self.options.add_argument("--no-sandbox")
        self.options.add_argument("--disable-dev-shm-usage")

        self.options.binary_location = "/data/chrome/chrome-linux64/chrome"
        self.chrome_service = ChromeService(executable_path="/data/chromedriver/chromedriver-linux64/chromedriver", service_log_path="/data/chromedriver/chromedriver.log")
        self.driver = webdriver.Chrome(service=self.chrome_service, options=self.options)

    def get_href(self, company):
        try:
            print("구글 검색 페이지에 접근합니다...")
            self.driver.get(f"https://www.google.com/search?q={company}" + " 인재상")
            print("첫 번째 항목의 URL을 가져오는 중...")
            first_title = self.driver.find_element_by_css_selector("h3.LC20lb.MBeuO.DKV0Md")
            url = first_title.find_element_by_xpath("./parent::a").get_attribute("href")
            print("첫 번째 검색 결과 URL을 성공적으로 가져왔습니다.")
            return url
        except Exception as e:
            print(f"검색 결과 URL을 가져오는 중 오류가 발생했습니다: {e}")
            return None
        finally:
            self.driver.quit()
    
    def get_text(self, url):
        try:
            print("URL에서 HTML 내용을 가져옵니다...")
            response = requests.get(url, verify=False)
            html_text = response.text
            print("HTML 내용을 성공적으로 가져왔습니다.")
            print("HTML을 파싱합니다...")
            soup = BeautifulSoup(html_text, "html.parser")
            text = soup.get_text()
            print("HTML을 성공적으로 파싱했습니다.")
            return text
        except Exception as e:
            print(f"명사를 추출하는 데 실패했습니다: {e}")
            return None