#!/bin/bash

# "tag:docker-api-gateway": "docker tag api-gateway:0.0.1 repo.treescale.com/seven-challenger/api-gateway:0.0.1",
# "tag:docker-sites-checker": "docker tag sites-checker:0.0.1 repo.treescale.com/seven-challenger/sites-checker:0.0.1",
# "tag:docker-parser": "docker tag parser:0.0.1 repo.treescale.com/seven-challenger/parser:0.0.1",

docker tag "$1:$2" "repo.treescale.com/seven-challenger/$1:$2"
