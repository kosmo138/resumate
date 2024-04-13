#!/bin/bash

# 실행 방법
# docker exec -it data /bin/sh
# sh /data/installer/install-scipy.sh

# 아래의 명령어 실행 시 다음 오류 표시
# fatal error: asm/hwcap.h: No such file or directory
# 원인: Alpine linux는 glibc 대신 musl libc를 사용하므로 glibc 헤더 파일이 없음

# apk add build-base gfortran openblas-dev
# pip install scipy==1.11.1

# 아래의 명령어로 설치
apk add py3-scipy