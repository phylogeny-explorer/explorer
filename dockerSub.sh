#!/bin/bash
# This command builds Docker images for the specified subsystem. 
# $1 is the folder of the subsystem e.g. client.
# $2 is the version number e.g. 1.0.0

cp $1/ecosystem.config.js build/$1
cp $1/Dockerfile build/$1
cp $1/start.sh build/$1

cd build/$1
docker build -t phylogenyexplorer/$1:$2 .
if [[ -z "${DOCKER_USERNAME}" ]]; then
exit 0
fi
if [[ -z "${DOCKER_PASSWORD}" ]]; then
exit 0
fi
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
#docker tag master phylogenyexplorer/$1
docker push phylogenyexplorer/$1:$2

cd ../..
