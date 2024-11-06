#!/bin/bash

if [ "$#" -eq 0 ]; then
  npm run migration:gen -v
else
   npm run migration:gen "$@"
fi
