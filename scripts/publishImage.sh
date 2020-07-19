#!/bin/bash

# "publish:docker-api-gateway": "yarn tag:docker-api-gateway && docker push repo.treescale.com/seven-challenger/api-gateway:0.0.1",
# "publish:docker-sites-checker": "yarn tag:docker-sites-checker && docker push repo.treescale.com/seven-challenger/sites-checker:0.0.1",
# "publish:docker-parser": "yarn tag:docker-parser && docker push repo.treescale.com/seven-challenger/parser:0.0.1",

./tagImage.sh $1 $2
docker push "repo.treescale.com/seven-challenger/$1:$2"
