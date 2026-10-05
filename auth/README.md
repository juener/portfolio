# Auth

## How to run locally
```
cd ../infra && npm run dev:docker && cd ../auth && npm run dev:local
```

## For production
It's already set to run using github actions at Vallete infrastructure.

- ../.github/workflows/auth-deploy.yml
Copy path

  - Test and lint;
  - Create image (ghcr.io);
  - Deploy using the image created.
