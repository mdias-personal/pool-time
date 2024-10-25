#!/bin/bash

echo "hi"

if [ "$1" == "build" ]; then
	mvn clean
	mvn frontend:webpack
	mvn install
fi

export $(cat envfile | xargs)

db_image_name="poolgreSQL"

running=$(docker ps | grep $db_image_name)

if [ -z "$running" ]; then
	echo "starting postgres in docker"
	docker start $db_image_name || docker run -d \
	 --name $db_image_name \
	 -p $DB_PORT:$DB_PORT \
	 --env POSTGRES_DB=$DB_NAME \
	 --env POSTGRES_USER=$DB_USERNAME \
	 --env POSTGRES_PASSWORD=$DB_PASSWORD \
	 postgres:16.3
fi

mvn spring-boot:run
