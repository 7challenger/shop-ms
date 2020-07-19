#!/bin/bash

docker tag "$1:$2" "repo.treescale.com/seven-challenger/$1:$2"
docker push "repo.treescale.com/seven-challenger/$1:$2"
