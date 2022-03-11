#STAGE 1
FROM node:16.13 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json./
RUN npm i
COPY . .
RUN npm run build --prod

#STAGE 2
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/app /usr/share/nginx/html
