#!/bin/sh -e

get_url() {
  curl "$HOST:$PORT$1"
}

post_url() {
  curl -X POST "$HOST:$PORT$1"
}

HOST=localhost
PORT=6900

while read url; do

  get_url $url

done < test/get-urls.txt

while read url; do

  post_url $url

done < test/post-urls.txt
