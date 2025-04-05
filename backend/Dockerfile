FROM node:22.14.0

WORKDIR /app

COPY . .

# Instala dependências já no ambiente do container (evita problemas com binários)
RUN yarn install

# Gera os clientes do Prisma
RUN npx prisma generate

RUN yarn build

CMD ["node", "dist/main"]