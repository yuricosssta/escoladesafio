# ==================================
# Estágio 1: "Builder" - Compila a aplicação
# ==================================
# Usamos um nome "builder" para este estágio
FROM node:22-alpine AS builder

# Define o diretório de trabalho
WORKDIR /usr/app

# Copia os arquivos de dependência. Usar '*' garante que o package-lock.json também seja copiado.
# Isso otimiza o cache do Docker.
COPY package*.json ./

# Instala TODAS as dependências, incluindo as de desenvolvimento para o build
RUN npm install

# Copia o restante do código-fonte da aplicação
COPY . .

# Roda o script de build para compilar o TypeScript para JavaScript na pasta /dist
RUN npm run build


# ==================================
# Estágio 2: "Production" - Imagem final e leve
# ==================================
# Começamos do zero com a mesma imagem base leve do Node
FROM node:22-alpine

# Define o diretório de trabalho
WORKDIR /usr/app

# Cria um usuário e grupo não-root para rodar a aplicação com mais segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 appuser

# Copia o package.json do estágio de build para o estágio de produção
COPY --from=builder /usr/app/package*.json ./

# Instala APENAS as dependências de produção.
RUN npm install --only=production

# Copia APENAS a pasta 'dist' (código compilado) do estágio de build
COPY --from=builder /usr/app/dist ./dist

# Muda o usuário para o usuário não-root que criamos
USER appuser

# Expõe a porta em que a aplicação vai rodar
EXPOSE 3001

# Comando para iniciar a aplicação a partir do código compilado
# É mais direto e eficiente que "npm start"
CMD ["node", "dist/main"]