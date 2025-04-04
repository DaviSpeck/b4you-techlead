FROM node:22.14.0

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY prisma ./prisma
COPY .env ./

RUN npx prisma generate

COPY . .

RUN yarn build

CMD ["node", "dist/main"]