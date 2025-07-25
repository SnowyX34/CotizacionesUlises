<<<<<<< HEAD
# Etapa de build con Node 20 (requerido por Angular CLI)
=======
# Etapa de build con Node 20 (soportado por Angular CLI actual)
>>>>>>> 6b43460698c9ef0a22d87ebe9e14f637e64884d0
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
