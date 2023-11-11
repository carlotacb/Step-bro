FROM node:20.9.0-slim

COPY . /code

WORKDIR code

RUN npm install

ENTRYPOINT ["node", "server.js"]
