FROM node:14 as prod
WORKDIR /app
COPY . .
RUN mkdir -p build; rm build/public/static/**/*.map
EXPOSE 3000
CMD yarn start:prod

FROM prod as dev
EXPOSE 3000
EXPOSE 3001
CMD yarn; yarn start