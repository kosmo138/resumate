import json
from core.models import Keyword
from core.database import session

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
    session.query(Keyword).filter(Keyword.company == company).update({Keyword.keyword: keyword_json})

def delete_keyword(company):
    session.query(Keyword).filter(Keyword.company == company).delete()
    session.commit()

def insertkeyword_bycompany(company):
    keyword_list = ['A', 'B', 'C']
    # 회사 이름 입력하면 인재상 키워드 뽑아 주는 로직
    insert_keyword(company, keyword_list)