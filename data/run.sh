#!/bin/bash

export PYTHONPATH=$PWD
pip install --no-cache-dir --upgrade -r ./requirements.txt
<<<<<<< HEAD
uvicorn app.main:app --host "0.0.0.0" --port 8000 --reload
=======
uvicorn app.main:app --host "0.0.0.0" --port 8000 --reload
>>>>>>> origin/dev
