FROM node:20.10.0

RUN apt-get update && apt-get install -y wait-for-it

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD wait-for-it db:3306 --timeout=30 --strict -- node server.js
