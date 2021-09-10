FROM node:alpine
COPY . app/.
WORKDIR app
RUN yarn install
EXPOSE 4200
ENTRYPOINT ["yarn", "start", "--host", "0.0.0.0"]
