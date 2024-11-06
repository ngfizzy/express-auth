#!/bin/bash

if [ "$#" -eq 0 ]; then
  echo "skipping tests"
else
   npm run "$@"
fi
