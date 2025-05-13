# Usa uma imagem Node com suporte a Expo
FROM node:18-alpine

# Instala dependências necessárias
RUN apk add --no-cache bash git

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package.json ./
COPY package-lock.json ./

# Instala as dependências
RUN npm install

# Instala a CLI do Expo
RUN npm install -g expo-cli

# Copia o restante dos arquivos
COPY . .

# Expo precisa dessa porta (web, Metro bundler, etc.)
EXPOSE 8081

# Comando para iniciar o Expo com acesso externo (via túnel ou LAN)
CMD ["npm", "start", "web"]
