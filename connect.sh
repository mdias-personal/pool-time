#!/bin/bash


export $(cat envfile | xargs)

docker_image_name=poolgreSQL

docker exec -it $docker_image_name psql -d $DB_NAME $DB_USERNAME
