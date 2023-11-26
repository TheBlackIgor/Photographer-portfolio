FROM  node:18-alpine

WORKDIR /usr/src/index

COPY package\*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE $PORT

CMD [ "npm", "start" ]