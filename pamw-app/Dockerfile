FROM node:12.13.0-alpine

RUN mkdir -p /usr/src/app-client
WORKDIR /usr/src/app-client

COPY package.json /usr/src/app-client
COPY package-lock.json /usr/src/app-client

RUN npm install

COPY . /usr/src/app-client

EXPOSE 8000

CMD [ "npm", "start" ]