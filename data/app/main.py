from fastapi import FastAPI

from api.main import api_router

app = FastAPI()
app.include_router(api_router, prefix="/data")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")