FROM node:14.16-alpine

WORKDIR /app

COPY / ./
RUN yarn install
RUN yarn global add pm2

ENV PORT=80

CMD ["npm", "run", "prod"]
