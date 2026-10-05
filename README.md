# Portfolio

Today, Oct 5th, 2026, most of people are developing their projects using AI only, and so do I. Nowadays I'm dedicating more time architecting and designing my projects while the AI speeds up the development process. However, this specific project I'm going to code 100% of the code, without any AI assistance.

## Architecture
This is a *modular monolith at the infra level with independently deployable services*. 

/portfolio 
  - auth 
    - nextjs 3000 
    - nestjs 4000 
  - infra (separated schema per application)
    - postgres 5432
    - redis 6379
    - rabbitmq 5672
    - minio 9000
  - app-1
    - nextjs 3002
    - nestjs 4002
  - app-2
    - nextjs 3003
    - nestjs 4003
  - app-n 
    - nextjs 3004
    - nestjs 4004


## A Messenger App
Through this portfolio app, using good arquitecture and design patterns, I'm going to code a messenger app.

- FR: 
  - [ ] Should exist a chat interface with a sidebar for conversations and a main area for messages.
  - [ ] Should be able to see a list of users and chat with them.
  - [ ] Should be able to send through a simple button.
  - [ ] Should be able to receive messages from the server with no need to refresh the page.

- NFR:
  - [ ] Should be able

## Env Files
This is a portfolio app, the used .env files are being pushed to the repository.

## Commands 
- NextJS: ([shadcnui](https://ui.shadcn.com/create?preset=b37arybX0&base=radix&pointer=true))
  ```
  npx shadcn@latest init --preset b37arybX0 --base radix --template next --pointer
  ```

- NestJS:
  ```
  npm uninstall @nestjs/platform-express
  npm install @nestjs/platform-fastify
  ```