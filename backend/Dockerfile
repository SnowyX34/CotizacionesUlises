FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx ng build --configuration=production

# Etapa de producción con Nginx
FROM nginx:alpine

COPY --from=build /app/dist/frontend /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf
