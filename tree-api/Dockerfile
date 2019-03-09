FROM node

WORKDIR /usr/src/app
COPY . .
EXPOSE 5500
RUN npm install -g npx@9.2.0
RUN npm install -g pm2
RUN npm install
RUN mkdir -p ~/.pm2/node_modules/
ENTRYPOINT ./start.sh
