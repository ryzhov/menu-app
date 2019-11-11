#!/bin/bash

. .env

export APP_VERSION=`node -pe "require('./package.json').version"`

if [ -z "$1" ]; then
	echo "required param for docker-compose missed allow => {build|up|...}"
	exit 1
fi

if [ ${APP_ENV} == "dev" ]; then 
	echo "environment => ${APP_ENV}, version => ${APP_VERSION}"
	docker-compose $1 $2 $3
fi
