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