FROM node:10-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./
RUN npm install

ARG BASE_URL
ARG KEYCLOAK_REALM 
ARG KEYCLOAK_CLIENT_ID

COPY . /app
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000
CMD npm run start
