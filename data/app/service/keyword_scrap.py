from selenium.webdriver.chrome.options import Options as ChromeOptions

from app.service.keyword_class import (
    GoogleSearchScraper,
    KeywordExtractor,
    TextAnalyzer,
)


def scrap_keyword(query):
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
                related_keywords = extractor.extract_related_keywords(
                    nouns, target_words
                )

                return list(related_keywords)
            else:
                raise Exception(
                    "Word2Vec 모델을 로드하지 못했습니다. 모델 경로를 확인하세요."
                )
        else:
            raise Exception("사이트에서 명사를 추출할 수 없습니다.")
    else:
        raise Exception("검색 결과 URL을 가져오지 못했습니다.")
