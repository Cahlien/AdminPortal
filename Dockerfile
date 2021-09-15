FROM node:alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist/beardtrust .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
