#!/bin/bash

. .env

PUSH_TO_REGISTRY=no
APP_VERSION=`node -pe "require('./package.json').version"`
BUILDER_IMAGE_NAME=${APP_NAME}.builder:${APP_VERSION:-local}
DOCKER_FILE=.docker/prod/Dockerfile

echo "version => ${APP_VERSION}, build image => ${BUILDER_IMAGE_NAME}"
docker build --target builder -t ${BUILDER_IMAGE_NAME} -f ${DOCKER_FILE} .
[ $? != 0 ] && echo "build image with target \"builder\" fail, exit." &&  exit 1

BUILD_HASH=`docker run --rm ${BUILDER_IMAGE_NAME} node getBuildHash.js`
PRODUCTION_IMAGE_NAME=${REGISTRY}/${APP_NAME}:${BUILD_HASH:-local}

echo "build production image => ${PRODUCTION_IMAGE_NAME}"
docker build -t ${PRODUCTION_IMAGE_NAME} -f ${DOCKER_FILE} .
[ $? != 0 ] && echo "build production image fail, exit." &&  exit 1

if [ ${PUSH_TO_REGISTRY} = "yes" ]; then
    echo "push image => ${PRODUCTION_IMAGE_NAME} to registry"
    docker push ${PRODUCTION_IMAGE_NAME}
    [ $? != 0 ] && echo "push production image fail, exit." &&  exit 1
fi

echo ${PRODUCTION_IMAGE_NAME}
