import json
from concurrent.futures import ThreadPoolExecutor, TimeoutError
from fastapi import HTTPException
from app.core.entity import Keyword
from app.core.database import session
from app.service.text_scraper import TextScraper
from app.service.keyword_extractor import KeywordExtractor


class KeywordService:
    # MySQL에서 먼저 조회를 시도하고 없으면 스크래핑을 시도
    def search_keyword(self, company: str) -> list[str]:
        try:
            company = company.lower().replace(" ", "")
            keyword_list: str = self.select_keyword(company)
            if len(keyword_list) == 0:
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
                keyword_json = json.dumps(keyword_list, ensure_ascii=False)
                self.insert_keyword(company, keyword_json)
            else:
                keyword_list = json.loads(keyword_list)
            return keyword_list
        except Exception:
            raise HTTPException(
                status_code=500, detail="인재상 키워드 탐색 중 오류가 발생했습니다."
            )

    # 인재상 검색 함수를 병렬로 처리하면서 30초 이상 걸리면 408 Request Timeout 에러를 반환
    def thread_search_keyword(self, company: str):
        # @see https://docs.python.org/ko/3/library/concurrent.futures.html
        with ThreadPoolExecutor() as executor:
            thread = executor.submit(self.search_keyword, company)
            try:
                return thread.result(timeout=30)
            except TimeoutError:
                raise HTTPException(status_code=408, detail="Request Timeout")

    # MySQL CRUD
    def insert_keyword(self, company: str, keyword_json: str):
        new_keyword = Keyword(company=company, keyword=keyword_json)
        session.add(new_keyword)
        session.commit()

    def select_keyword(self, company: str):
        record = session.query(Keyword).filter(Keyword.company == company).first()
        if record is not None:
            return record.keyword
        else:
            return None

    def update_keyword(self, company: str, keyword_json: str):
        session.query(Keyword).filter(Keyword.company == company).update(
            {Keyword.keyword: keyword_json}
        )

    def delete_keyword(self, company: str):
        session.query(Keyword).filter(Keyword.company == company).delete()
        session.commit()
