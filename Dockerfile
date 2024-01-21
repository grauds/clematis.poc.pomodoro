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

ARG WORK_DIR=/opt/software
ARG APP_NAME=clematis-poc-pomodoro

# Path to application in docker
ENV APP_ROOT=${WORK_DIR}/${APP_NAME}
WORKDIR ${APP_ROOT}
RUN mkdir -p "$APP_ROOT"

# Path to copy application from
ARG DIST_PATH=$WORK_DIR/dist
ARG NODE_PATH=$WORK_DIR/node_modules

COPY --from=0 $DIST_PATH $APP_ROOT/dist
COPY --from=0 $NODE_PATH $APP_ROOT/node_modules

RUN npm install express -g

EXPOSE 3000 
ENTRYPOINT ["sh", "-c", "node ${APP_ROOT}/dist/server/server.js"]