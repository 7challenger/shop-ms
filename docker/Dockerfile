FROM node:12-alpine

ARG APP_DIR=app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

# RUN apk add --no-cache chromium --repository=http://dl-cdn.alpinelinux.org/alpine/v3.10/main
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

COPY package.json .
COPY yarn.lock .
COPY webpack.config.js .

RUN yarn global add webpack webpack-cli
RUN yarn

COPY . .

RUN yarn build

COPY . .

EXPOSE 3002

CMD [ "yarn", "start:api" ]
