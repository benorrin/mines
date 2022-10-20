FROM node:16.18.0

ENV MONGODB_URI=mongodb://solminesadmin:JEfuSzv9XXRnGShWagXHwuAuXesENACPvrx87WAKbbCy4HkX8Zz3HMUeMirx2xkt@solmines-docdb-cluster.cluster-ctlde4z2eqvj.us-east-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false
ENV SECRET_KEY="7nEv7AogZAZfEQnif8EjHU8NRDG47x2y"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]