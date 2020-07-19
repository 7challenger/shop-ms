#!/bin/bash

docker build --build-arg host=http://chabox.ru -t "$1:$2" -f $3 .