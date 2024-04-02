from konlpy.tag import Kkma
from gensim.models import Word2Vec


class KeywordExtractor:
    def __init__(self):
        self.kkma = Kkma()
        self.model_path = "/data/models/wiki.model"
        self.model = self.load_word2vec_model()

    def extract_nouns(self, text):
        try:
            print("명사를 추출하는 중...")
            nouns = self.kkma.nouns(text)
            print("명사를 성공적으로 추출했습니다.")
            return nouns
        except Exception as e:
            print("Error occurred while extracting nouns:", e)
            return None

    def load_word2vec_model(self):
        try:
            print("Word2Vec 모델을 로드하는 중...")
            model = Word2Vec.load(self.model_path)
            print("Word2Vec 모델을 성공적으로 로드했습니다.")
            return model
        except Exception as e:
            print("Error occurred while loading Word2Vec model:", e)
            return None

    def extract_related_keywords(self, nouns, threshold=0.6):
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
        related_keywords = set()
        for target_word in target_words:
            for noun in nouns:
                try:
                    similarity = self.model.wv.similarity(noun, target_word)
                    if similarity >= threshold:
                        related_keywords.add(noun)
                except KeyError:
                    pass
        return related_keywords
