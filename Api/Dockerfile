FROM node:12-alpine

ARG APP_DIR=app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache make python gcc postgresql-dev g++

RUN yarn global add webpack webpack-cli

COPY ./Api ./Api
# COPY ./Utils ./Utils
COPY ./BuildTools ./BuildTools

# Temp workaround till private packaging will be bought
# RUN cd ./Utils && yarn --ignore-engines && yarn link
# RUN cd ./Api && yarn link @7challenger/Utils

RUN cd ./BuildTools && yarn --ignore-engines && yarn link
RUN cd ./Api && yarn link @7challenger/BuildTools

RUN cd ./Api && yarn --ignore-engines && yarn build

# RUN mv ./Api/build/main.js .
# RUN mv ./Api/entrypoint.sh .

EXPOSE 3002

CMD [ "sh", "./Api/entrypoint.sh" ]
