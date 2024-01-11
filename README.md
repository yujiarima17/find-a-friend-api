# Find a Friend API

This project is a NodeJS API application that any user can adopt a pet from an Org. Its possible to register an Org, fetch pets based on filters, register a pet, authenticate an org.

## API Docs

#### Return the own Org details.

```http
  GET /details
```

#### Register an Org.

```http
  POST /orgs
```

#### Authenticate an Org.

```http
  POST /sessions
```

#### Register a Org Pet

```http
  GET /:orgId/pets
```

#### Return the Pet details based on id

```http
  GET /pets/:petId
```

#### Return all Pets

```http
  GET /pets
```

#### Return Pets based on a filter of query params values .

```http
  GET /pets?q=search
```

## Running Locally

Clone the Project.

```bash
  git clone https://github.com/yujiarima17/find-a-friend-api
```

Change to the project dir.

```bash
  cd find-a-friend-api
```

Dependencies install.

```bash
  npm install
```

Initialize the server in a dev environment.

```bash
  npm run start:dev
```

## Tests Running

To run the tests :

```bash
  // runs all unity tests
  npm run test
```

## Stack utilizada

**Back-end:** Node, Fastify ( Fastify Cookie, Fastify JWT), Vitest, Prisma, Zod;

## Project Learning

On this project I put myself on a challenge to practice my knowledge that i acquired from the last project, Gym Pass API. I think that i need to improve a lot about some points like JWT and code tests possibilities. Although I could to improve during the whole process development.
I used also Insomnia to simulate a client making some requests to back-end.

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yuji-arima-7b7059209/)
