# ==================================
# Estágio 1: "Builder" - Instala dependências e compila o projeto
# ==================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia o restante do código-fonte
COPY . .

# Roda o script de build. Graças à configuração no next.config.js,
# isso vai gerar a pasta otimizada .next/standalone
RUN npm run build


# ==================================
# Estágio 2: "Production" - A imagem final
# ==================================
FROM node:22-alpine AS runner

WORKDIR /app

# Cria um usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 appuser

# Copia os arquivos de saída otimizados do estágio 'builder'
# O --chown garante que o usuário 'appuser' seja o dono dos arquivos
COPY --from=builder --chown=appuser:nodejs /app/public ./public
COPY --from=builder --chown=appuser:nodejs /app/.next/standalone ./
COPY --from=builder --chown=appuser:nodejs /app/.next/static ./.next/static

# Muda para o usuário não-root
USER appuser

EXPOSE 3000

# Define a porta que o Next.js vai usar
ENV PORT 3000

# Comando para iniciar o servidor de produção otimizado do Next.js
# O 'server.js' é criado automaticamente pelo 'output: standalone'
CMD ["node", "server.js"]