FROM node:16.18.0-alpine as base

WORKDIR /usr/src/app

COPY package*.json \ 
    tsconfig.json \
    /usr/src/app/

EXPOSE 4001
EXPOSE 3025

FROM base as production
ENV NODE_ENV=production
RUN npm install pm2 -g
RUN npm ci
COPY src/ src/
CMD pm2-runtime start:production

FROM base as dev
ENV NODE_ENV=development
RUN npm install
COPY src/ src/
CMD npm run start:dev
