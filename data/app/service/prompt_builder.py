from fastapi import HTTPException
from langchain.chains import LLMChain
from langchain_core.prompts import PromptTemplate
from app.core.env import OPENAI_API_KEY
import json

