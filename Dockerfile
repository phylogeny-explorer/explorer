FROM node

WORKDIR /usr/src/app
COPY . ./
RUN npm install -g npx@9.2.0
RUN npm install
RUN npm run build
EXPOSE 3000
ENTRYPOINT ./start.sh
