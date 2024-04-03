import csv
from keyword_class import (
    GoogleSearchScraper,
    KeywordExtractor,
    TextAnalyzer,
)
import json
from app.service.keyword_bak import insert_keyword_results


def extract_keywords(csv_file_path):
    # Word2Vec 모델 경로
    model_path = "wiki.model"
    # 목표 단어 리스트
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

    # GoogleSearchScraper, KeywordExtractor, TextAnalyzer 객체 생성
    scraper = GoogleSearchScraper()
    extractor = KeywordExtractor(model_path)
    analyzer = TextAnalyzer()

    extracted_data = []

    try:
        with open(csv_file_path, "r", encoding="utf-8") as file:
            csv_reader = csv.reader(file)
            for row in csv_reader:
                if row:  # 빈 행이 아닌 경우에만 회사 이름 데이터를 가져옴
                    company_name = row[0]
                    print(f"Processing company: {company_name}")

                    # 회사 이름을 사용하여 검색 결과 URL 가져오기
                    url = scraper.get_first_search_result_url(company_name)
                    if url:
                        # URL에서 HTML 내용을 추출하여 명사 추출
                        nouns = analyzer.extract_nouns_from_html(url)
                        if nouns:
                            # 추출된 명사를 사용하여 관련 키워드 추출
                            related_keywords = extractor.extract_related_keywords(
                                nouns, target_words
                            )
                            if related_keywords:
                                print(
                                    f"Related keywords for {company_name}: {related_keywords}"
                                )
                                # 추출된 데이터를 딕셔너리 형태로 저장
                                company_data = {
                                    "company": company_name,
                                    "keywords": list(related_keywords),
                                }
                                extracted_data.append(company_data)
                            else:
                                print(f"No related keywords found for {company_name}")
                        else:
                            print(f"No nouns extracted from HTML for {company_name}")
                    else:
                        print(f"Failed to get search result URL for {company_name}")
    except Exception as e:
        print(f"An error occurred: {e}")

    return extracted_data


def main(csv_file_path):
    extracted_data = extract_keywords(csv_file_path)
    # 추출된 데이터를 JSON 형식으로 출력
    insert_keyword_results(extracted_data)
    print(json.dumps(extracted_data, indent=4, ensure_ascii=False))


if __name__ == "__main__":
    csv_file_path = "companies.csv"  # CSV 파일 경로
    main(csv_file_path)
