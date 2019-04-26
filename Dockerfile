FROM node

WORKDIR /usr/src/app
COPY . ./
RUN yarn install
RUN yarn run build:release
EXPOSE 3000
EXPOSE 5000
EXPOSE 5500
ENTRYPOINT ./start.sh
