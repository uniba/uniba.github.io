#!/bin/bash

set -eu

echo
echo " Downloading CSV from Google spreadsheets..."
echo

manuscripts=(
  "1Um0wM3RrUaByQyzcusi9u7vi8YrfWzE1Qty0txavSrY 0 data/events.csv"
)

for ((i = 0; i < ${#manuscripts[@]}; i++)) {
  set -- ${manuscripts[i]}
  echo " [$(($i + 1))/${#manuscripts[@]}] Downloading: $3"
  curl --silent "https://docs.google.com/spreadsheets/d/$1/export?gid=$2&format=csv&id=$2" > $3
}

echo
echo " All done."
echo