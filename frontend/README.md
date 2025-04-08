# 🖥️ B4YOU Frontend

Este diretório contém a aplicação front-end desenvolvida com **Next.js** e **Tailwind CSS**, consumindo a API da aplicação backend do teste técnico para a vaga de Tech Lead.

## ✅ Funcionalidades

- Login com autenticação JWT
- Registro de novos usuários
- Dashboard de campanhas com CRUD completo
- Atualização de perfil e troca de senha
- Logout e controle de sessão com tokens
- Proteção de rotas e integração com API

## 🚀 Tecnologias

- **Next.js 14 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Shadcn/UI**
- **Sonner (toast notifications)**

## ▶️ Executando localmente

```bash
# Instale as dependências
yarn install

# Rode o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em: [http://localhost:3000](http://localhost:3000)

> Certifique-se de que o backend está rodando em `http://localhost:7000` (ou conforme definido na variável de ambiente).

## 🌍 Variáveis de ambiente

Crie um arquivo `.env` com base no `.env.example`:

```
NEXT_PUBLIC_API_URL=http://localhost:7000/api/v1
```

## 📁 Estrutura

```
.
├── src/
│   ├── app/              # Rotas da aplicação (App Router)
│   ├── components/       # Componentes reutilizáveis
│   ├── lib/              # Funções utilitárias e contextos
│   ├── styles/           # Estilos globais (Tailwind)
│   ├── types/            # Tipagens globais
|   ├── utils/            # Funções utilitárias
└── .env.example          # Variáveis de ambiente
```

## 👤 Autor

Davi Speck  
[LinkedIn](https://www.linkedin.com/in/davi-speck-a872a71b7/)  
[E-mail](mailto:davispeck86@gmail.com)