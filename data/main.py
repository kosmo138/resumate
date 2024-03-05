from fastapi import FastAPI

app = FastAPI()

@app.get("/data/test")
async def getTest():
    return {"message": "GET response from FastAPI"}

@app.post("/data/test")
async def postTest():
    return {"message": "POST response from FastAPI"}