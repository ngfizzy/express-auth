#!/bin/bash

if [ "$#" -eq 0 ]; then
  ls 
  npm run migration:gen -v
else
  ls -al
   npm run migration:gen "$@"
fi
