FROM node:16.18.0-alpine

WORKDIR /usr/src/app

COPY package*.json \ 
    tsconfig.json \
    /usr/src/app/

RUN npm install

COPY src/ src/

EXPOSE 4000

CMD npm run start