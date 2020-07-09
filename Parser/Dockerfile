FROM node:12-alpine

ARG APP_DIR=app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    udev \
    python \
    ttf-freefont \
    chromium

RUN yarn global add webpack webpack-cli

COPY ./Parser ./Parser
COPY ./Utils ./Utils
COPY ./BuildTools ./BuildTools

# Temp workaround till private packaging will be bought
RUN cd ./Utils && yarn --ignore-engines && yarn link
RUN cd ./Parser && yarn link @7challenger/Utils

# Temp workaround till private packaging will be bought
RUN cd ./BuildTools && yarn --ignore-engines && yarn link
RUN cd ./Parser && yarn link @7challenger/BuildTools

RUN cd ./Parser && yarn --ignore-engines && yarn build

EXPOSE 3004

CMD [ "node", "./Parser/build/main.js" ]
