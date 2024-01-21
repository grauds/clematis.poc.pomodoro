# ------------------------------------------------------------------------------
# BUILD STAGE
# ------------------------------------------------------------------------------

FROM node:18-alpine AS build-image

WORKDIR /opt/software/src

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
COPY --from=build-image  $WORK_DIR/coverage .
COPY --from=build-image  $WORK_DIR/node_modules .

# ------------------------------------------------------------------------------
# RUNTIME STAGE (deployment)
# ------------------------------------------------------------------------------

FROM node:16 

ARG WORK_DIR=/opt/software
ARG APP_NAME=clematis-poc-pomodoro
ARG APP_SRC_DIR=$WORK_DIR/src

# Path to copy application from
ARG DIST_PATH=$APP_SRC_DIR/dist
ARG NODE_PATH=$APP_SRC_DIR/node_modules

# Path to application in docker
ENV APP_ROOT=$WORK_DIR/$APP_NAME
RUN mkdir -p "$APP_ROOT"
COPY --from=0 $DIST_PATH $APP_ROOT
COPY --from=0 $NODE_PATH $APP_ROOT/node_modules

RUN npm install express -g

EXPOSE 3000 

#RUN node ${APP_ROOT}/server/server.js

# start static server
ENTRYPOINT ["sh", "-c", "node ${APP_ROOT}/server/server.js"]