# Etapa 1: Construcción de la aplicación Angular
FROM node:14-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine
COPY --from=build /app/dist/tu-nombre-de-aplicacion-angular /usr/share/nginx/html
EXPOSE 4001
