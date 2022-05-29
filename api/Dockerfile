FROM node:17-alpine3.14

COPY . /api
WORKDIR /api

RUN npm install -g @nestjs/cli

RUN yarn install
RUN yarn build
RUN rm -rf node_modules
RUN yarn install --production

CMD ["yarn", "start:prod"]