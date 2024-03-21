# ======= Komoran이 사용하는 모델 파일의 설치 여부를 확인==========================
# from konlpy.tag import Komoran

# # Komoran 객체 생성
# komoran = Komoran()

# # 형태소 분석 시도
# result = komoran.pos("안녕하세요. 한국어 형태소 분석기 KoNLPy의 Komoran입니다.")

# # 결과 출력
# print(result)

# ============= konlpy라이브러리를 사용해 komoran클래스를 사용할 수 있음. ==============================
#   -komoran클래스를 사용하여 텍스트에서 명사만 추출하는 예제코드(완성)
from konlpy.tag import Komoran

# 코모란 형태소 분석기 초기화
komoran = Komoran()
# 분석할 텍스트
text = "안녕하세요. 코엔엘파이를 사용하여 텍스트 분석을 해봅시다."
# 텍스트에서 명사만 추출
nouns = komoran.nouns(text)
# 추출된 명사 출력
for noun in nouns:
    print(noun)