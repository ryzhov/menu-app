#!/bin/bash

. .env

APP_VERSION=`node -pe "require('./package.json').version"`
LOCAL_PORT=127.0.0.1:8080
LOCAL_PORT_SSL=127.0.0.1:8443
CONTAINER_NAME=${APP_NAME}.prod_v${APP_VERSION}

if [ -z "$1" ]; then
	echo "required param  <docker_image_name> missed"
	exit 1
fi

PRODUCTION_IMAGE_NAME=${1}

# -- check for already started container for this application --
CONTAINER_ID=`docker ps -q --filter="name=${CONTAINER_NAME}"`
if [ -n "${CONTAINER_ID}" ]; then
	echo "stop container => `docker container stop ${CONTAINER_ID}`"
fi

echo "start production image => ${PRODUCTION_IMAGE_NAME}"
docker run --rm -d -p ${LOCAL_PORT}:80/tcp -p ${LOCAL_PORT_SSL}:443/tcp --name ${CONTAINER_NAME} ${PRODUCTION_IMAGE_NAME}