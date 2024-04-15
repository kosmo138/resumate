#!/bin/bash
echo "[INFO] Building the package."
sh mvnw clean package
echo "[INFO] Starting Spring at port 8080."
java -jar target/server-0.0.1.jar