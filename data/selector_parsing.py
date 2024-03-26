# ================================================
#lgcns 인재상
import requests
from bs4 import BeautifulSoup

def extract_h2_texts():
    url = "https://www.lgcns.com/careers/who-we-are/"
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        contents = soup.find_all(class_='content')
        h2_texts = []
        for content in contents:
            h2_tags = content.find_all('h2')
            for h2_tag in h2_tags:
                h2_texts.append(h2_tag.text.strip())
        return h2_texts
    else:
        print("Failed to retrieve data from the website.")
        return None

if __name__ == "__main__":
    h2_texts = extract_h2_texts()
    if h2_texts:
        print("Texts of <h2> tags inside elements with class 'content':")
        for text in h2_texts:
            print(text)
    else:
        print("Failed to retrieve <h2> texts.")