FROM node:12-alpine

ARG APP_DIR=app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

RUN yarn global add webpack webpack-cli

COPY ./Api ./Api
COPY ./Utils ./Utils
COPY ./BuildTools ./BuildTools

# Temp workaround till private packaging will be bought
RUN cd ./Utils && yarn --ignore-engines && yarn link
RUN cd ./Api && yarn link @7challenger/Utils

RUN cd ./BuildTools && yarn --ignore-engines && yarn link
RUN cd ./Api && yarn link @7challenger/BuildTools

RUN cd ./Api && yarn --ignore-engines && yarn build

RUN rm -rf ./Utils
RUN rm -rf ./BuildTools
RUN mv ./Api/build/main.js .
RUN rm -rf ./Api

EXPOSE 3002

CMD [ "node", "./main.js" ]
