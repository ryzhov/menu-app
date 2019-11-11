#!/bin/bash

. .env

DOCKER_PARAMS=""
COMMAND=sh
APP_VERSION=`node -pe "require('./package.json').version"`
CONTAINER_NAME=${APP_NAME}.${APP_ENV}_v${APP_VERSION:-local}

if [ ${APP_ENV} == "dev" ]; then 
    USER=`whoami`
	DOCKER_PARAMS="-u ${USER}"
    COMMAND=bash
fi

docker exec -it ${DOCKER_PARAMS} ${CONTAINER_NAME} ${COMMAND}
