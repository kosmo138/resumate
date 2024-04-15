#!/bin/bash

# From: https://gist.github.com/varyonic/dea40abcf3dd891d204ef235c6e8dd79?permalink_comment_id=4986528#gistcomment-4986528

# 실행 방법
# docker exec -it data /bin/sh
# sh /data/installer/install-chromedriver.sh

# Install Chrome and Chromedriver

# Install dependencies
apt update -y && apt install -y wget xvfb unzip jq default-jdk

# Install Google Chrome dependencies
apt install -y libxss1 libappindicator1 libgconf-2-4 \
  fonts-liberation libasound2 libnspr4 libnss3 libx11-xcb1 libxtst6 lsb-release xdg-utils \
  libgbm1 libnss3 libatk-bridge2.0-0 libgtk-3-0 libx11-xcb1 libxcb-dri3-0

# Fetch the latest version numbers and URLs for Chrome and ChromeDriver
curl -s https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions-with-downloads.json > /tmp/versions.json

CHROME_URL=$(jq -r '.channels.Stable.downloads.chrome[] | select(.platform=="linux64") | .url' /tmp/versions.json)
wget -q --continue -O /tmp/chrome-linux64.zip $CHROME_URL
unzip /tmp/chrome-linux64.zip -d /data/chrome
chmod +x /data/chrome/chrome-linux64/chrome

CHROMEDRIVER_URL=$(jq -r '.channels.Stable.downloads.chromedriver[] | select(.platform=="linux64") | .url' /tmp/versions.json)
wget -q --continue -O /tmp/chromedriver-linux64.zip $CHROMEDRIVER_URL
unzip /tmp/chromedriver-linux64.zip -d /data/chromedriver
chmod +x /data/chromedriver/chromedriver-linux64/chromedriver

# Set up Chromedriver Environment variables
export CHROMEDRIVER_DIR=/data/chromedriver
export PATH=$CHROMEDRIVER_DIR:$PATH

# Clean up
rm /tmp/chrome-linux64.zip /tmp/chromedriver-linux64.zip /tmp/versions.json
