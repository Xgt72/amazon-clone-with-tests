FROM node:lts-alpine

RUN mkdir app
WORKDIR /app

COPY package.json ./
RUN npm install

COPY ./index.js ./index.js
COPY ./migrate.js ./migrate.js
COPY ./database.sql ./database.sql
COPY ./src ./src
COPY ./tests ./tests

RUN npm run migrate:test

CMD npm run test