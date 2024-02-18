FROM node:slim

ARG API_TOKEN
ARG SNAPSHOT_FOLDER="./test"

ENV TOKEN=${API_TOKEN}
ENV SNAPSHOT_FOLDER=${SNAPSHOT_FOLDER}

WORKDIR /app

COPY . .

RUN npm i
RUN npm run build

CMD npm start