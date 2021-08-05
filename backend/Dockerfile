FROM node:12-buster-slim

WORKDIR /usr/src/app
COPY . .
RUN npm install

EXPOSE 8000
CMD [ "node", "main.js" ]