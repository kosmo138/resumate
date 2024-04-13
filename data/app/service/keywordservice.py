import json
import concurrent.futures
from fastapi import HTTPException
from app.core.entity import Keyword
from app.core.database import session
from app.service.textscraper import TextScraper
from app.service.keywordextractor import KeywordExtractor


class KeywordService:
    def insert_keyword(company, keyword_list):
        keyword_json = json.dumps(keyword_list, ensure_ascii=False)
        new_keyword = Keyword(company=company, keyword=keyword_json)
        session.add(new_keyword)
        session.commit()

    def select_keyword(company):
        record = session.query(Keyword).filter(Keyword.company == company).first()
        if record is not None:
            return record.keyword
        else:
            return None

    def update_keyword(company, keyword_list):
        keyword_json = json.dumps(keyword_list, ensure_ascii=False)
        session.query(Keyword).filter(Keyword.company == company).update(
            {Keyword.keyword: keyword_json}
        )

    def delete_keyword(company):
        session.query(Keyword).filter(Keyword.company == company).delete()
        session.commit()

    # MySQL에서 먼저 조회를 시도하고 없으면 스크래핑을 시도
    def search_keyword(self, company):
        try:
            keyword_list = self.select_keyword(company)
            if keyword_list == None:
                print("[Debug] DB에 없어 스크래핑을 시작합니다.")
                keyword_list = []
                text_scraper = TextScraper()
                keyword_extractor = KeywordExtractor()
                href = text_scraper.get_href(company)
                if href == None:
                    raise HTTPException(
                        status_code=500, detail="회사명을 다시 입력해 주세요."
                    )
                text = text_scraper.get_text(href)
                if text == None:
                    raise HTTPException(
                        status_code=500, detail="텍스트를 가져오는 데 실패했습니다."
                    )
                nouns = keyword_extractor.extract_nouns(text)
                if nouns == None:
                    raise HTTPException(
                        status_code=500, detail="명사 추출에 실패했습니다."
                    )
                related_keywords = keyword_extractor.extract_related_keywords(nouns)
                keyword_list = list(related_keywords)
                self.insert_keyword(company, keyword_list)
            return keyword_list
        except Exception as e:
            print(e)

    # 인재상 검색 함수를 병렬로 처리하면서 30초 이상 걸리면 408 Request Timeout 에러를 반환
    def thread_search_keyword(self, company):
        # @see https://docs.python.org/ko/3/library/concurrent.futures.html
        with concurrent.futures.ThreadPoolExecutor() as executor:
            future = executor.submit(self.search_keyword, company)
            try:
                return future.result(timeout=30)
            except concurrent.futures.TimeoutError:
                raise HTTPException(status_code=408, detail="Request Timeout")
