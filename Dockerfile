FROM node:14.16-alpine

COPY / ./
RUN yarn install
RUN yarn global add pm2

ENV APP_PORT=80

CMD ["npm", "run", "prod"]
#CMD ["npm", "run", "dev"]
#CMD [ "pm2-runtime", "./src", "--interpreter", "babel-node" ]
