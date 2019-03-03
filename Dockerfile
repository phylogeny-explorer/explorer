FROM node

WORKDIR /usr/src/app
COPY . ./
RUN npm install -g npx@9.2.0
RUN npm install
RUN npm run build:release
EXPOSE 3000
EXPOSE 5000
EXPOSE 5500
ENTRYPOINT ./start.sh
