# SECURITY.md

## Medidas de Segurança Implementadas

- ✅ Autenticação via JWT com Refresh Token
- ✅ Rate Limiting com @nestjs/throttler
- ✅ CORS configurado para origem segura
- ✅ Uso de .env para variáveis sensíveis
- ✅ Hash de senha com `bcryptjs`
- ✅ Validação de DTOs com `class-validator`
- ✅ Swagger protegido com Bearer Token

## Riscos Identificados

- ❗ Falta de CSRF no frontend (ainda não implementado)
- ❗ Falta de RBAC (controle de acesso por perfil)
- ❗ Senhas fracas (apesar de validação, sem verificação de vazamentos)

## Melhorias Futuras

- 🔒 Implementar roles e permissions (RBAC)
- 🧠 Rate limiting com Redis para ambiente distribuído
- 📜 Auditoria de acessos e alterações críticas
- 🔐 Helmet para reforço de headers HTTP