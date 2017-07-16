FROM node:8.1.1


# RUN mkdir -p /tmp
ADD package.json /tmp/package.json
RUN cd /tmp/ && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

RUN npm install node-dev -g

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
ADD ./src /app/src
WORKDIR /app

# replace this with your application's default port
EXPOSE 8888

# ENTRYPOINT pm2 start src/main.js
ENTRYPOINT node-dev src/app.js