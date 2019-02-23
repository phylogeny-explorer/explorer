FROM node

WORKDIR /usr/src/app
COPY . .
EXPOSE 5500
ENTRYPOINT npx pm2 start ecosystem.config.js
