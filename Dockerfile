# ------------------------------------------------------------------------------
# BUILD STAGE
# ------------------------------------------------------------------------------

FROM node:18-alpine AS build-image

WORKDIR /opt/software

COPY .eslintrc.json jest.config.js jest.setup.ts package.json tsconfig.json webpack.config.js ./

COPY bin bin
COPY cfg cfg
COPY src src

RUN npm install

RUN npm run build:prod
RUN npm test

# ------------------------------------------------------------------------------
# COPY COVERAGE STAGE (after build)
# ------------------------------------------------------------------------------

FROM scratch AS test-out
COPY --from=build-image  /opt/software/coverage .

# ------------------------------------------------------------------------------
# RUNTIME STAGE (deployment)
# ------------------------------------------------------------------------------

FROM node:16 

ARG APP_NAME=clematis-poc-pomodoro
ARG WORK_DIR=/opt/software
ARG APP_SRC_DIR=$WORK_DIR/$APP_NAME

# Path to copy application from
ARG SOURCE_PATH=$WORK_DIR/dist

# Path to application in docker. Used by nginx to serve static
ENV APP_ROOT=/var/www/$APP_NAME
RUN mkdir -p "$APP_ROOT"
COPY --from=0 $SOURCE_PATH $APP_ROOT

RUN npm install express -g

EXPOSE 3000 

# start static server
ENTRYPOINT ["sh", "-c", "node ${APP_ROOT}/server/server.js"]