#!/bin/bash
# This command builds Docker images for the specified subsystem. 
# $1 is the folder of the subsystem e.g. client.

cp $1/ecosystem.config.js release/$1
cp $1/Dockerfile release/$1
cd release/$1
docker build -t phylogeny-explorer/$1:0.0.1 .
cd ../..