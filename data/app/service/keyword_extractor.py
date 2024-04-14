from konlpy.tag import Kkma
from gensim.models import Word2Vec
from fastapi import HTTPException


class KeywordExtractor:
    def __init__(self):
        self.kkma = Kkma()
        self.model_path = "/data/models/wiki.model"
        self.model = self.load_word2vec_model()

    def extract_nouns(self, text):
        try:
            nouns = self.kkma.nouns(text)
            return nouns
        except Exception:
            raise HTTPException(
                status_code=500, detail="인재상 키워드 추출에 실패했습니다."
            )

    def load_word2vec_model(self):
        try:
            model = Word2Vec.load(self.model_path)
            return model
        except Exception:
            raise HTTPException(
                status_code=500, detail="Word2Vec 모델을 불러오는 데 실패했습니다."
            )

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
