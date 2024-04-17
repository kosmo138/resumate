#!/bin/bash
if ! dpkg -s build-essential; then
  echo "[INFO] Package is not installed. Installation started."
  apt update
  apt install -y build-essential gfortran libblas-dev libopenblas-dev pkg-config
  apt install -y default-libmysqlclient-dev libmariadb-dev
  pip install --no-cache-dir --upgrade -r ./requirements.txt
  echo "[INFO] Package installation completed."
else
  echo "[INFO] Package is already installed."
fi