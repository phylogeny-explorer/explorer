FROM node

WORKDIR /usr/src/app
COPY . .
ENTRYPOINT npx pm2 start ecosystem.config.js
