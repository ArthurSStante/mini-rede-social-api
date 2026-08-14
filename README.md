# Mini Rede Social — API

API REST para uma rede social simples, com autenticação, posts, curtidas, comentários e perfis de usuário. Projeto desenvolvido para prática e revisão de conceitos de back-end.

🔗 **Front-end deste projeto:** [mini-rede-social-front](https://github.com/ArthurSStante/mini-rede-social-front)

## 🚀 Deploy

🔗 **API em produção:** [https://mini-rede-social-api.onrender.com](https://mini-rede-social-api.onrender.com)

> ⚠️ Hospedada no plano gratuito do Render — se a API ficar inativa por um tempo, a primeira requisição pode levar até 50 segundos para responder enquanto o servidor "acorda".

## 🛠️ Tecnologias

- Node.js
- Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs

## ✨ Funcionalidades

- Cadastro e login de usuários com autenticação via JWT
- Criação, edição, exclusão e listagem de posts (com paginação)
- Sistema de curtidas (toggle)
- Comentários em posts
- Perfil de usuário público (visualização de dados e posts de qualquer usuário)
- Edição do próprio perfil (nome e bio)
- Autorização: apenas o autor pode editar/excluir seu próprio conteúdo

## 📋 Endpoints

### Autenticação

| Método | Rota                 | Descrição                 | Protegida |
| ------ | -------------------- | ------------------------- | --------- |
| POST   | `/api/auth/register` | Cria uma nova conta       | Não       |
| POST   | `/api/auth/login`    | Autentica e retorna token | Não       |

### Usuários

| Método | Rota             | Descrição                          | Protegida |
| ------ | ---------------- | ---------------------------------- | --------- |
| GET    | `/api/users/:id` | Busca perfil e posts de um usuário | Não       |
| PUT    | `/api/users/me`  | Edita o próprio perfil (nome/bio)  | Sim       |

### Posts

| Método | Rota                  | Descrição              | Protegida |
| ------ | --------------------- | ---------------------- | --------- |
| GET    | `/api/posts`          | Lista posts (paginado) | Não       |
| GET    | `/api/posts/:id`      | Busca post por id      | Não       |
| POST   | `/api/posts`          | Cria um post           | Sim       |
| PUT    | `/api/posts/:id`      | Edita um post          | Sim       |
| DELETE | `/api/posts/:id`      | Exclui um post         | Sim       |
| POST   | `/api/posts/:id/like` | Curte/descurte um post | Sim       |

### Comentários

| Método | Rota                          | Descrição                    | Protegida |
| ------ | ----------------------------- | ---------------------------- | --------- |
| GET    | `/api/posts/:postId/comments` | Lista comentários de um post | Não       |
| POST   | `/api/posts/:postId/comments` | Cria um comentário           | Sim       |
| DELETE | `/api/comments/:id`           | Exclui um comentário         | Sim       |

## 🔧 Como rodar localmente

```bash
git clone [LINK_DO_REPO_API](https://github.com/ArthurSStante/mini-rede-social-api)

cd mini-rede-social-api

npm install
``` 

Crie um arquivo `.env` na raiz com:

``` 
# PORT=5000

# MONGO_URI=sua_string_de_conexao_mongodb

# JWT_SECRET=sua_chave_secreta
``` 

```bash
npm run dev
``` 

## 📌 Sobre o projeto

Este projeto foi desenvolvido como prática de revisão de conceitos de back-end, incluindo autenticação com JWT, hash de senhas, modelagem de relacionamentos no MongoDB, autorização de recursos e boas práticas de API REST.
