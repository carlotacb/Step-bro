FROM node:20.9.0-slim

ENV NODE_TLS_REJECT_UNAUTHORIZED='0'

COPY . /code

WORKDIR code

RUN npm install

ENTRYPOINT ["node", "server.js"]
