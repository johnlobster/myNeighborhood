#!/bin/sh

# don't allow commit if on master branch

tmp=`git rev-parse --abbrev-ref HEAD`
if [ $tmp = "master" ]; then
  echo "Must not commit to master branch"
  exit 1
fi
