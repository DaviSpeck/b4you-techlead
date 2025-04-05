# MONITORING.md

## Monitoramento Atual

- 🩺 Endpoint `/health` implementado com verificação de banco de dados (SQLite)
- 📦 Estrutura modular para futura integração de métricas

## Ferramentas Sugeridas

### Logs
- [ ] Winston + Elasticsearch (ELK Stack)
- [ ] Sentry para rastreamento de exceções

### Métricas
- [ ] Prometheus + Grafana para monitoramento de uso
- [ ] Healthchecks em `/health` + métricas customizadas

### Alertas
- [ ] Notificações via Slack/Discord + Webhooks
- [ ] UptimeRobot / StatusCake para disponibilidade

## Estratégia
- Configurar middleware global para log de erros
- Medir tempo de resposta e carga por rota
- Criar dashboards com alertas configurados