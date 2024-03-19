# ## selenium, webdriver 설치 확인
# import selenium
# from selenium import webdriver
# from selenium.webdriver.common.keys import Keys

# driver = webdriver.Chrome('chromedriver.exe') ## 크롬 드라이버가 위치한 경로 대입 필요
# ----------
# from selenium import webdriver

# driver = webdriver.Chrome('chromedriver.exe')
# driver.get("https://www.naver.com")

# while(True):
#     pass

# ----------
from selenium import webdriver

# 브라우저 옵션 설정
options = webdriver.ChromeOptions()
options.add_argument('--headless')  # 브라우저를 화면에 표시하지 않음

# Chrome WebDriver 서비스 생성
service = webdriver.ChromeService(executable_path='chromedriver.exe')

# Chrome WebDriver 인스턴스 생성
driver = webdriver.Chrome(service=service, options=options)