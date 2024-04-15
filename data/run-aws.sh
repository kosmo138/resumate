#!/bin/bash

if ! dpkg -s build-essential; then
  echo "[INFO] Package is not installed. Installation started."
  apt update
  apt install -y build-essential gfortran libblas-dev libopenblas-dev pkg-config
  apt install -y default-libmysqlclient-dev libmariadb-dev
  apt install -y default-jdk
  python get-pip.py
  pip install --no-cache-dir --upgrade -r ./requirements.txt
  echo "[INFO] Package installation completed."
else
  echo "[INFO] Package is already installed."
fi

echo "[INFO] Starting FastAPI at port 8000."
export PYTHONPATH=$PWD
python -m uvicorn app.main:app --host "0.0.0.0" --port 8000