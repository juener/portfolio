# used by /.github/workflows/auth-deploy.yml only

FROM node:24-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY . .
RUN NEST_DATABASE_URL=postgresql://build npx prisma generate && npm run build

FROM node:24-bookworm-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY prisma prisma
COPY prisma.config.ts .
COPY --from=build /app/dist dist

CMD ["node", "dist/main.js"]
