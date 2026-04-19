# Planning Poker (Next.js + Jira)

Base inicial com arquitetura feature-first para validar portabilidade entre projetos.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Zustand
- React Query
- Axios
- Zod + React Hook Form
- Docker + Docker Compose

## Estrutura

```text
src/
├── app/
├── core/
│   ├── api/
│   ├── config/
│   ├── providers/
│   ├── store/
│   ├── theme/
│   └── utils/
├── shared/
│   └── ui/
└── features/
	├── auth/
	└── payments/
```

## Rodando local

1. Copie variaveis de ambiente:

```bash
cp .env.example .env.local
```

2. Instale dependencias e rode:

```bash
npm install
npm run dev
```

## Validacoes

```bash
npm run lint
npm run typecheck
npm run build
```

## Docker

```bash
cp .env.example .env.local
docker compose up --build
```

App em `http://localhost:3000`.
