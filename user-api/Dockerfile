FROM node

WORKDIR /usr/src/app
ADD package.json .
RUN npm -G install yarn && yarn install
COPY . .
RUN mkdir -p ~/.pm2/node_modules/
EXPOSE 5000
ENTRYPOINT ./start.sh
