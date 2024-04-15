from typing import List
from datetime import date
from sqlalchemy import Column, Integer, String, JSON
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel


Base = declarative_base()


class Keyword(Base):
    __tablename__ = "keyword"

    id = Column(Integer, primary_key=True, autoincrement=True)
    company = Column(String(40), unique=True, nullable=False)
    keyword = Column(JSON, nullable=False)


class Letter(BaseModel):
    resume_id: int
    company: str
    job: str
    category: str
    text: str
    command: str


class Award(BaseModel):
    date: date
    content: str


class Education(BaseModel):
    date: str
    content: str


class CareerData(BaseModel):
    date: str
    content: str


class Resume(BaseModel):
    award: List[Award]
    skill: str
    title: str
    language: str
    education: List[Education]
    careerData: List[CareerData]
    careerText: str
