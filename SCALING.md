# SCALING.md

## Arquitetura da Aplicação

```
+------------------+      HTTP       +--------------------+
|  Next.js (React) +---------------> |     NestJS API     |
+------------------+                 |   (Auth + CRUD)    |
                                     +----------+---------+
                                                |
                                          Prisma ORM
                                                |
                                         +------v------+
                                         |  SQLite DB  |
                                         +-------------+
```

## Estratégia de Escalabilidade

1. **Separação por Domínio**: Dividir a aplicação em microsserviços por contexto (Auth, Campaigns, Users).
2. **Cache de Requisições**: Usar Redis para cache de autenticação, tokens e dados estáticos.
3. **Mensageria**: Introduzir fila com BullMQ (Redis) para tarefas como envio de e-mails, auditorias, etc.
4. **Banco de Dados**: Evoluir do SQLite para PostgreSQL e usar replicação para leitura e escrita.
5. **Orquestração**: Utilização de Docker + Kubernetes com horizontal scaling.
6. **CDN e Proxy**: Uso de Cloudflare ou NGINX para caching, balanceamento e proteção.

## Evolução do Frontend

- Migrar para SSR completo com Next.js
- Aplicar caching de dados via SWR/React Query
- Suporte a mobile com PWA