FROM node:alpine

WORKDIR /src/app

COPY . /src/app

RUN npm install -g @angular/cli

RUN npm install

# Serve Application using Nginx Server
FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html
EXPOSE 80

# CMD ["ng", "serve", "--host", "0.0.0.0","--disable-host-check"]