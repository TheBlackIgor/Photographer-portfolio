FROM  node:18-alpine

WORKDIR /usr/src/index

ENV MongoDB_ACCESS="mongodb+srv://TheBlackIgro:znid3895@michalreussportfolio.eiunlxr.mongodb.net/"
ENV JWT_KEY="dskhfakasjdbfuadbvcuhabd4h5v123k41u42vjvdsa"
ENV USRNAME="reussPajac"
ENV PASSWORD="8-$2b$08$WE2R2wg/DgggoWVGJcCLrug1Hzz3LPxxi5dqJ7gyW/.ExtBjFxXXm"
ENV EMAIL_PASSWORD="vtde cjkc ckwe kdhp"
ENV PORT=80

COPY package\*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

CMD [ "npm", "start" ]