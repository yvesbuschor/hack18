FROM node

COPY ./ /app
WORKDIR /app

RUN npm install -g yarn
RUN yarn install

CMD ["yarn", "start"]
