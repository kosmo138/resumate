from langchain.chains import LLMChain
from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from app.core.env import OPENAI_API_KEY

# See: https://python.langchain.com/docs/integrations/llms/openai/
if __name__ == "__main__":
    template = """Question: {question}
    Answer: Let's think step by step."""
    prompt = PromptTemplate.from_template(template)

    llm = OpenAI(openai_api_key=OPENAI_API_KEY)
    llm_chain = LLMChain(prompt=prompt, llm=llm)
    question = "What NFL team won the Super Bowl in the year Justin Beiber was born?"

    output = llm_chain.run(question)
    print(output)