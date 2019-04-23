#!/bin/sh

LINE=$(ps aux | grep -w "common-watch.sh" | grep -v grep | wc -l)
echo $LINE

if [ "$LINE" -le "2" ]
then
  npm install -g wml
  watchman watch ../../common
  wml add ../../common ../common-mobile
  wml start
 else
     echo "Process already running"
     exit

fi
