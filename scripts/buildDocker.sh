#!/bin/bash

# "build:docker-api-gateway": "docker build --build-arg host=http://chabox.ru -t api-gateway:0.0.1 -f ./Api/Dockerfile .",
# "build:docker-sites-checker": "docker build -t sites-checker:0.0.1 -f ./SitesChecker/Dockerfile .",
# "build:docker-parser": "docker build -t parser:0.0.1 -f ./Parser/Dockerfile .",

docker build --build-arg host=http://chabox.ru -t "$1:$2" -f $3 .