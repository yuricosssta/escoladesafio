# Usa imagem leve do Node
FROM node:18-alpine

# Define diretório de trabalho no container
WORKDIR /usr/app

# Copia o package.json e instala dependências
COPY package.json ./
RUN npm install

# Copia o restante da aplicação
COPY . .

# Define variáveis de ambiente (serão lidas do .env pelo docker-compose)
ARG MONGO_URI
ARG JWT_SECRET
ENV MONGO_URI=$MONGO_URI
ENV JWT_SECRET=$JWT_SECRET

# Compila a aplicação (se necessário)
# RUN npm run build (se você tiver build)

# Expõe a porta usada pela aplicação
EXPOSE 3001

# Comando padrão ao iniciar o container
CMD ["npm", "start"]
