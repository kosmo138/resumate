#!/bin/bash

# 실행 방법
# docker exec -it data /bin/sh
# sh /data/installer/dependencies.sh

# 아래의 명령어 실행 시 다음 오류 표시
# fatal error: asm/hwcap.h: No such file or directory
# 원인: Alpine linux는 glibc 대신 musl libc를 사용하므로 glibc 헤더 파일이 없음
# 해결: Debian 기반의 python:3.12-slim 이미지로 변경

# Alpine Linux (ERROR)
# apk add build-base gfortran openblas-dev

# Debian Linux (Solved)
apt update
# scipy
apt install -y build-essential gfortran libblas-dev libopenblas-dev pkg-config
# mysqlclient
apt install -y default-libmysqlclient-dev libmariadb-dev
# konlpy
apt install -y default-jdk
pip install scipy==1.11.1
