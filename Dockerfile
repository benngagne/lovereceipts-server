FROM node:15.5.0-alpine3.10
USER node
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node  package*.json ./
RUN npm install
COPY --chown=node:node . .
EXPOSE 15752 15753
CMD [ "node", "server.js" ]