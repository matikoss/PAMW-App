FROM node:12.13.0-alpine

RUN mkdir -p /usr/src/app-server-login
WORKDIR /usr/src/app-server-login

COPY package.json /usr/src/app-server-login
COPY package-lock.json /usr/src/app-server-login

RUN npm install

COPY . /usr/src/app-server-login

EXPOSE 3000

CMD [ "npm", "start" ]