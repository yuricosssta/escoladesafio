# Escola Desafio — Plataforma Completa

Este repositório reúne a solução completa da plataforma **Escola Desafio**, composta por uma API RESTful (BackEnd) e um aplicativo mobile (FrontEnd).  
O objetivo é oferecer autenticação segura, gerenciamento de usuários, posts e navegação moderna, utilizando tecnologias atuais do ecossistema JavaScript/TypeScript.

---

## 📂 Estrutura do Projeto
escoladesafio/ ├── BackEnd/ # API NestJS + MongoDB + JWT ├── Mobile/ # App React Native + Expo ├── docker-compose.yml


---

## 🚀 Como rodar o projeto

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (opcional, para rodar o app mobile fora do Docker)

### 2. Configuração de variáveis de ambiente

- Copie os arquivos de exemplo `.env.example` para `.env` em **BackEnd** e **Mobile** e ajuste conforme necessário.

```bash
cp  
cp 

### 3. Suba os serviços com Docker Compose

docker-compose build
docker-compose up

A API estará disponível em: http://localhost:3001
O app mobile pode ser rodado via Docker ou manualmente com Expo.

### 4. Rodando o app mobile localmente (opcional)

cd Mobile
npm install
npm run web         # Para rodar no navegador
npm run android     # Para rodar em emulador/dispositivo Android
npm run ios         # Para rodar em emulador iOS (Mac)

🛠️ Tecnologias Utilizadas
BackEnd: NestJS, MongoDB, JWT, Zod
FrontEnd: React Native, Expo, React Navigation, Axios, AsyncStorage

🔒 Autenticação
Login via /auth/login retorna um token JWT.
O token deve ser enviado no header Authorization para acessar rotas protegidas:

<vscode_annotation details='%5B%7B%22title%22%3A%22hardcoded-credentials%22%2C%22description%22%3A%22Embedding%20credentials%20in%20source%20code%20risks%20unauthorized%20access%22%7D%5D'> </vscode_annotation> Authorization: Bearer <token>

- Usuário admin padrão criado automaticamente:
- **Email:** `admin@admin.com`
- **Senha:** `12345678`

---

## 📦 Funcionalidades

### API (BackEnd)

- Autenticação JWT
- CRUD de usuários (admin)
- CRUD de posts
- Documentação Swagger em `/api`

### Mobile (FrontEnd)

- Login e logout
- Listagem e cadastro de posts
- Listagem, cadastro e filtro de usuários (admin)
- Perfil do usuário autenticado
- Navegação por abas (Posts, Configurações)
- Interface responsiva para Android, iOS e Web

---

## 📄 Licença

MIT

---

> Desenvolvido para fins educacionais.