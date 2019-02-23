FROM node

WORKDIR /usr/src/app
COPY . .
EXPOSE 5000
ENTRYPOINT npx pm2 start ecosystem.config.js
