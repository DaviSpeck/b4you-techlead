# 📦 B4YOU Tech Lead - Backend API

Este repositório contém a implementação da API para o teste técnico da vaga de Tech Lead da B4YOU.

## ✅ Funcionalidades implementadas

- CRUD de campanhas de creators (`id`, `name`, `budget`, `status`)
- Autenticação com JWT e refresh token
- Rota `/health` para verificação de status da aplicação e conexão com o banco
- Segurança:
  - CORS configurado
  - Rate limiting com `@nestjs/throttler`
  - Validação de entrada com `class-validator`
  - Uso de `.env` para segredos
- Documentação Swagger disponível em `/api/docs`

## 🧠 Tecnologias utilizadas

- **NestJS** com **TypeScript** – framework principal
- **Prisma ORM** – modelagem e acesso a dados
- **SQLite** – banco de dados usado para testes locais
- **JWT com refresh token** – autenticação segura
- **Swagger (OpenAPI)** – documentação da API
- **Rate limiting com @nestjs/throttler** – proteção contra abusos
- **Validações com class-validator** – segurança e consistência dos dados
- **Docker** – ambiente isolado para backend e banco de dados
- **dotenv** – variáveis de ambiente
- **CORS configurado** – já preparado para integração com front-end

## 🚀 Instalação local

```bash
# 1. Instale as dependências
yarn install

# 2. Gere os arquivos do Prisma (usando SQLite)
npx prisma generate
npx prisma migrate dev --name init

# 3. Rode a aplicação
yarn start:dev
```

A API estará disponível em: [http://localhost:7000/api/v1](http://localhost:7000/api/v1)  
Documentação Swagger: [http://localhost:7000/api/docs](http://localhost:7000/api/docs)

## 🐳 Docker

```bash
docker-compose up --build
```

Isso irá levantar o backend e garantir que a aplicação esteja rodando isoladamente.

## 🔐 Variáveis de ambiente

Crie um arquivo `.env` com base no exemplo abaixo:

```
DATABASE_URL="file:./dev.db"
JWT_SECRET=supertokensecreto
JWT_REFRESH_SECRET=refreshsecreto
PORT=7000
```

## 📫 Desenvolvedor

Davi Speck  
[LinkedIn](https://www.linkedin.com/in/davi-speck-a872a71b7/) | davispeck86@gmail.com