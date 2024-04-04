import json
import threading
from fastapi import HTTPException
from entity import Keyword
from app.core.database import session
from app.service.keyword_scrap import scrap_keyword


# 회사명 및 인재상 키워드 CRUD on MySQL


# keyword_csv.py에서 키워드 결과를 받아 insert하는 함수
def insert_keyword_csv(results):
    for result in results:
        company = result["company"]
        keywords = result["keywords"]
        insert_keyword(company, keywords)


def insert_keyword(company, keyword_list):
    keyword_json = json.dumps(keyword_list)
    new_keyword = Keyword(company=company, keyword=keyword_json)
    session.add(new_keyword)
    session.commit()


def select_keyword(company):
    keyword = session.query(Keyword).filter(Keyword.company == company).first().keyword
    return keyword


def update_keyword(company, keyword_list):
    keyword_json = json.dumps(keyword_list)
    session.query(Keyword).filter(Keyword.company == company).update(
        {Keyword.keyword: keyword_json}
    )


def delete_keyword(company):
    session.query(Keyword).filter(Keyword.company == company).delete()
    session.commit()


# MySQL에서 먼저 조회를 시도하고 없으면 스크래핑을 시도
def search_keyword(company):
    try:
        keyword_list = select_keyword(company)
        print(f"[Debug] keyword_list: {keyword_list}")
        if keyword_list == None:
            keyword_list = scrap_keyword(company)
        return json.dumps(keyword_list)
    except Exception as e:
        print(e)
    finally:
        # driver.quit()
        pass


# 인재상 검색 함수를 병렬로 처리하면서 15초 이상 걸리면 408 Request Timeout 에러를 반환
def thread_search_keyword(company):
    threads = []
    for i in range(5):
        thread = threading.Thread(target=search_keyword, args=(company,))
        thread.start()
        threads.append(thread)
    for i in range(5):
        threads[i].join(timeout=15)
    if thread.is_alive():
        raise HTTPException(status_code=408, detail="Request Timeout")
