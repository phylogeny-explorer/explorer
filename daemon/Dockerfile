FROM node

WORKDIR /usr/src/app
COPY . .
RUN npm -G install yarn && yarn install
RUN mkdir -p ~/.pm2/node_modules/
ENTRYPOINT ./start.sh
