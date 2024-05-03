# Description
This is a REST APIs project based on Fastify, Prisma, PostgreSQL, Swagger, TypeScript, Docker and Jest. The aim is to provide a solid framework for developing scalable and maintainable APIs. *I created a few more APIs for test use, with authentication*.

I choose to implement a database as a test, and use prism to facilitate communication with the database.


| Plugin |
| ------ |
| Fastify |
| Prisma |
| Docker |
| Jest |
| TypeScript |


## Architecture

- src
- - controllers
- - - Events
- - - Users
- - services
- - - Events
- - - Users
- - utils
- - integration
- - server.ts
- - app.ts

This was the architecture chosen, but it can be changed to 'module architecture', for example:

- src
- - models
- - - Events
- - - - events.controller.ts
- - - - events.service.ts
- - - - events.schema.ts
- - - Users
- - - - ssers.controller.ts
- - - - ssers.service.ts
- - - - ssers.schema.ts
- - utils
- - integration
- - server.ts
- - app.ts


## Prerequisites

Make sure you have Node.js, Docker installed on your system.

## Installation

```sh
npm install
docker-compose up -d
npx prisma db push (if you don't have prisma installed, run the command - npm install @prisma/client)
```

### Running the project

```sh
.vscode configured, it can run by pressing F5, the project would perform the build and run after the build is generated.
```

or


```sh
npm run dev
```

## Unit test - Jest

```sh
npm run test
```

## Build and start

```sh
npm run build
npm run start
```

## Swagger

After starting the project, you can open the swagger on the route - http://localhost:3000/swagger
<!-- 
## ENV

```sh
DATABASE_URL="postgresql://postgres:admin@localhost:5432/database"
TICKETMASTER_KEY="4sKN9vuw7fEwxb65GLA2bYLSXkDC7FR9"
``` -->