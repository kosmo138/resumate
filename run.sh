#!/bin/bash
cd client && yarn run start &
cd ../server && java -jar target/server-0.0.1.jar &
cd ../data && uvicorn app.main:app --host "0.0.0.0" --port 8000 &