FROM node:12.13.0-alpine

RUN mkdir -p /usr/src/app-server-files
WORKDIR /usr/src/app-server-files

COPY package.json /usr/src/app-server-files
COPY package-lock.json /usr/src/app-server-files

RUN npm install

COPY . /usr/src/app-server-files

EXPOSE 3001

CMD [ "npm", "start" ]
