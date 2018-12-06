#!/bin/sh -e

if [ -f .env ]; then

  echo 'Reading file ".env"'
  
  while read line; do
    export $line;
  done < .env

fi
