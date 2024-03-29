import json
<<<<<<< HEAD
import threading
from fastapi import HTTPException
from app.core.models import Keyword
from app.core.database import session


# 회사명 및 인재상 키워드 CRUD on MySQL
=======
from core.models import Keyword
from core.database import session

>>>>>>> origin/dev
def insert_keyword(company, keyword_list):
    keyword_json = json.dumps(keyword_list)
    new_keyword = Keyword(company=company, keyword=keyword_json)
    session.add(new_keyword)
    session.commit()

<<<<<<< HEAD

=======
>>>>>>> origin/dev
def select_keyword(company):
    keyword = session.query(Keyword).filter(Keyword.company == company).first().keyword
    return keyword

<<<<<<< HEAD

def update_keyword(company, keyword_list):
    keyword_json = json.dumps(keyword_list)
    session.query(Keyword).filter(Keyword.company == company).update(
        {Keyword.keyword: keyword_json}
    )

=======
def update_keyword(company, keyword_list):
    keyword_json = json.dumps(keyword_list)
    session.query(Keyword).filter(Keyword.company == company).update({Keyword.keyword: keyword_json})
>>>>>>> origin/dev

def delete_keyword(company):
    session.query(Keyword).filter(Keyword.company == company).delete()
    session.commit()
<<<<<<< HEAD


# MySQL에서 먼저 조회를 시도하고 없으면 스크래핑을 시도
def search_keyword(company):
    try:
        keyword_list = select_keyword(company)
        if keyword_list == None:
            print("Scraping keyword for company: ", company)
            # driver = webdriver.Chrome()
            # driver.get("https://www.google.com")
            # driver.find_element_by_name("q").send_keys("site:company.com")
            # driver.find_element_by_name("btnK").click()
            # keyword_list = driver.find_elements_by_css_selector("div.srg div.g h3")
            # keyword_list = [keyword.text for keyword in keyword_list]
            # insert_keyword(company, keyword_list)
        return json.dumps(keyword_list)
    except Exception as e:
        print(e)
    finally:
        # driver.quit()
        pass


# 인재상 검색 함수를 병렬로 처리하면서 15초 이상 걸리면 408 Request Timeout 에러를 반환
def thread_scrape_keyword(company):
    thread = threading.Thread(target=search_keyword, args=(company,))
    thread.start()
    thread.join(timeout=15)
    if thread.is_alive():
        raise HTTPException(status_code=408, detail="Request Timeout")
    else:
        return thread.result
=======
>>>>>>> origin/dev
