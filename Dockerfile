FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

RUN yarn global add sequelize

COPY . .

EXPOSE 5001

RUN chmod +x ./main

CMD ["./main"]
