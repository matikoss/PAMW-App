FROM node:12.13.0-alpine

RUN mkdir -p /usr/src/app-server
WORKDIR /usr/src/app-server

COPY package.json /usr/src/app-server
COPY package-lock.json /usr/src/app-server

RUN npm install

COPY . /usr/src/app-server

EXPOSE 3000

CMD [ "npm", "start" ]