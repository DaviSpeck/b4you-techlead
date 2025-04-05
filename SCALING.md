# SCALING.md

## Arquitetura da Aplicação

```
+------------------+      HTTP       +--------------------+
|  Frontend (Web)  +---------------> |   NestJS API       |
+------------------+                | (Autenticação,     |
                                    |  Campanhas, Users) |
                                    +----------+---------+
                                               |
                                               | Prisma ORM
                                               |
                                        +------v------+
                                        | SQLite DB   |
                                        +-------------+
```

## Estratégia de Escalabilidade

1. **Separação por Domínio**: Dividir a aplicação em microsserviços por contexto (Auth, Campaigns, Users).
2. **Cache de Requisições**: Usar Redis para cache de autenticação, tokens e dados estáticos.
3. **Mensageria**: Introduzir fila com BullMQ (Redis) para tarefas como envio de e-mails, auditorias, etc.
4. **Banco de Dados**: Evoluir do SQLite para PostgreSQL e usar replicação para leitura e escrita.
5. **Orquestração**: Utilização de Docker + Kubernetes com horizontal scaling.
6. **CDN e Proxy**: Uso de Cloudflare ou NGINX para caching, balanceamento e proteção.