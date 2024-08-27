# Etapa 1: Construcción de la aplicación Angular
FROM node:20-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g @angular/cli  # Instalar Angular CLI globalmente
RUN npm install --legacy-peer-dependencies
COPY . .
RUN ng build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine
COPY --from=build /app/dist/front-view-chatbot /usr/share/nginx/html
EXPOSE 4001
