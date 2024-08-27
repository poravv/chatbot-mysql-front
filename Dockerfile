# Etapa 1: Construcción de la aplicación Angular
FROM node:14-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g @angular/cli  # Instalar Angular CLI globalmente
RUN npm install
COPY . .
RUN ng build --prod

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine
COPY --from=build /app/dist/tu-nombre-de-aplicacion-angular /usr/share/nginx/html
EXPOSE 4001
