# import문 - 필요한 라이브러리를 가져옴.
import requests  # 웹페이지에 HTTP요청을 보내고 응답을 받아오는데 사용됨.
from bs4 import BeautifulSoup  # HTML 및 XML파일에서 데이터를 추출하기 위해 사용됨.


def crawl_google_results(query):
    url = f"https://www.google.com/search?q={query}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
    }

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        results = soup.find_all("div", class_="BNeawe iBp4i AP7Wnd")
        return [
            result.text for result in results if query.lower() in result.text.lower()
        ]
    else:
        print("Failed to fetch results from Google.")
        return []


def main():
    query = input("검색어를 입력하세요: ")
    search_results = crawl_google_results(query)
    if search_results:
        print("검색 결과:", search_results)
    else:
        print("검색 결과가 없습니다.")


if __name__ == "__main__":
    main()
