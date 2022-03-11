FROM node:16.13 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD ["node", "server.js"]