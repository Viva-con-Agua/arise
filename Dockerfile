FROM node:11.3.0-alpine as build-stage
WORKDIR /arise
#COPY package*json ./
#RUN npm i npm@latest -g
#RUN npm install
COPY . .
#RUN npm run build
# production stage
FROM nginx:1.13.12-alpine as production-stage
COPY --from=build-stage /arise/dist /usr/share/nginx/html/arise
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
