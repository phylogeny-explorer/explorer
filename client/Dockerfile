FROM node

WORKDIR /usr/src/app
ADD package.json .
RUN npm -G install yarn && yarn install
COPY . .
RUN mkdir -p ~/.pm2/node_modules/
ENTRYPOINT ./start.sh
EXPOSE 3000


