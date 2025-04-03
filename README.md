Como usar:
Crie/modifique o .env na raiz com suas variáveis reais

Execute com:
docker-compose up -d --build

Para ambiente de produção:
docker-compose --env-file .env.prod up -d --build