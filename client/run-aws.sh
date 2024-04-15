#!/bin/bash
echo "[INFO] Updating the package list."
yarn
echo "[INFO] Building the application."
yarn run build
echo "[INFO] Starting Next.js at port 3000."
yarn run start