FROM node:16.18.0

ARG mongodb_uri
ARG secret_key

ENV MONGODB_URI=$mongodb_uri
ENV SECRET_KEY="$secret_key"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD [ "npm", "start" ]