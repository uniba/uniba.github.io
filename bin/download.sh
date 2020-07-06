#!/bin/bash

set -eu

echo
echo " Downloading CSV from Google spreadsheets..."
echo

manuscripts=(
  "1Um0wM3RrUaByQyzcusi9u7vi8YrfWzE1Qty0txavSrY data/events.csv"
)

for ((i = 0; i < ${#manuscripts[@]}; i++)) {
  set -- ${manuscripts[i]}
  echo " [$(($i + 1))/${#manuscripts[@]}] Downloading: $2"
  curl --silent -L "https://docs.google.com/spreadsheets/d/$1/export?format=csv" > $2
}

echo
echo " https://docs.google.com/spreadsheets/d/$1/export?format=csv"
echo " All done."
echo