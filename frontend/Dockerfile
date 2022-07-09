FROM node:16

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY . .

CMD ["npm", "dev"]