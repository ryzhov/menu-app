# ---- BUILD IMAGE ----
FROM node:alpine AS builder

RUN apk update && apk upgrade && \
    apk add --no-cache git

RUN mkdir app
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# ---- PROD IMAGE ----
FROM nginx:stable-alpine
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=builder /app/dist .
