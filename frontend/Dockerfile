# Etapa de build con Node 20 (soportado por Angular CLI actual)
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --configuration production

# Etapa de producción con Nginx
FROM nginx:alpine

COPY --from=build /app/dist/Cotizaciones /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf
