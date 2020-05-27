#!/usr/bin/env bash

set -o errexit

root="$(dirname "$0")/.."
app="${root}/client_old"

(
  cd "${app}"
 
  if [[ ! -d node_modules/.bin ]]; then
    echo "Installing dependencies"
    npm install
  fi

  echo "Installing dependencies"
  npm install --no-package-lock
  echo "Starting frontend server"
  npm run lintfix
  npm run dev
)
