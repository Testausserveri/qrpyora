FROM arm64v8/node:16-alpine3.14

RUN wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub
RUN wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.33-r0/glibc-2.33-r0.apk
RUN apk add glibc-2.33-r0.apk

WORKDIR /usr/src/app
COPY . .
RUN npm install

EXPOSE 8000
CMD [ "node", "main.js" ]