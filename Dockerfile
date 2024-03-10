FROM node:alpine as node

WORKDIR /app

COPY . .

RUN npm install -g @angular/cli

RUN npm install

RUN npm run build --prod

# Serve Application using Nginx Server
FROM nginx:alpine
COPY --from=node /app/dist/icas-frontend/ /usr/share/nginx/html
EXPOSE 80

CMD ["ng", "serve", "--host", "0.0.0.0","--disable-host-check"]