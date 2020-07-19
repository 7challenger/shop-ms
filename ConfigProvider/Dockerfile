FROM node:12-alpine

ARG host
ARG APP_DIR=app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

ENV NODE_HOST=${host}

RUN yarn global add webpack webpack-cli

COPY ./ConfigProvider ./ConfigProvider
# COPY ./Utils ./Utils
COPY ./BuildTools ./BuildTools

# Temp workaround till private packaging will be bought
# RUN cd ./Utils && yarn --ignore-engines && yarn link
# RUN cd ./Api && yarn link @7challenger/Utils

RUN cd ./BuildTools && yarn --ignore-engines && yarn link
RUN cd ./ConfigProvider && yarn link @7challenger/BuildTools

RUN cd ./ConfigProvider && yarn --ignore-engines && yarn build

# RUN mv ./Api/build/main.js .
# RUN mv ./Api/entrypoint.sh .

EXPOSE 3005

CMD [ "node", "./ConfigProvider/build/main.js" ]
