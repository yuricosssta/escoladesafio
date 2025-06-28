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
O token deve ser enviado no header Authorization para acessar rotas protegidas.

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

# Escola Desafio API

API RESTful para gerenciamento de usuários, autenticação e posts, construída com [NestJS](https://nestjs.com/), MongoDB e JWT.

---

## 🚀 Como rodar

1. **Configure o arquivo `.env`**

   Copie `.env.example` para `.env` na pasta `BackEnd` e preencha com suas variáveis reais:

   ```bash
   cp BackEnd/.env.example BackEnd/.env
   ```

2. **Suba a aplicação com Docker Compose**

   ```bash
   docker-compose build
   docker-compose up
   ```

   A API estará disponível em `http://localhost:3001`.

---

## 📦 Endpoints principais

### Autenticação

- **POST /auth/login**  
  Autentica um usuário e retorna um token JWT.
  ```json
  {
    "email": "admin@admin.com",
    "password": "12345678"
  }
  ```
  **Resposta:**
  ```json
  {
    "access_token": "jwt_token"
  }
  ```

- **GET /auth/profile**  
  Retorna o perfil do usuário autenticado.  
  **Header:**  
  `Authorization: Bearer <token>`

---

### Usuários

- **GET /users**  
  Lista todos os usuários (apenas admin).

- **POST /users**  
  Cria um novo usuário (apenas admin).
  ```json
  {
    "email": "user@email.com",
    "name": "Nome",
    "password": "senha",
    "isAdmin": false,
    "rule": 2
  }
  ```

- **GET /users/:userId**  
  Busca usuário por ID.

- **PUT /users/:userId**  
  Atualiza usuário (apenas admin).

- **DELETE /users/:userId**  
  Remove usuário (apenas admin).

---

### Posts

- **GET /posts**  
  Lista todos os posts.

- **GET /posts/:postId**  
  Busca post por ID.

- **POST /posts**  
  Cria um novo post (usuário autenticado).
  ```json
  {
    "title": "Título",
    "description": "Descrição",
    "content": "Conteúdo"
  }
  ```

- **PUT /posts/:postId**  
  Atualiza um post.

- **DELETE /posts/:postId**  
  Remove um post.

---

## 🔒 Autenticação

- Use o endpoint `/auth/login` para obter um token JWT.
- Envie o token no header `Authorization` para acessar rotas protegidas:
  ```
  Authorization: Bearer <token>
  ```

---

## 🛠️ Tecnologias

- [NestJS](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)
- [JWT](https://jwt.io/)
- [Zod](https://zod.dev/) (validação)

---

## 📝 Observações

- Um usuário admin padrão é criado automaticamente ao subir a aplicação:
  - **Email:** `admin@admin.com`
  - **Senha:** `12345678`
- A documentação Swagger estará disponível em:  
  `http://localhost:3001/api`

---

## 🧪 Testes

Para rodar os testes (dentro da pasta `BackEnd`):

```bash
npm install
npm run test
```

---

## 📄 Licença

MIT

---

> Desenvolvido para fins educacionais.