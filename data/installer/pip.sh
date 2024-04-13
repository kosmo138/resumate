#!/bin/bash

# 실행 방법
# docker exec -it data /bin/sh
# sh /data/installer/install-pip.sh

curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python get-pip.py
rm get-pip.py