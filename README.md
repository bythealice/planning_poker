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
	│   ├── components/
	│   │   └── login-view.tsx
	│   ├── content/
	│   │   └── login-copy.ts
	│   ├── hooks/
	│   │   └── use-login-model.ts
	│   ├── types/
	│   │   ├── login-schema.ts
	│   │   └── index.ts
	│   ├── utils/
	│   │   └── room-code.ts
	│   ├── login-view-model.tsx
	│   └── index.ts
	└── payments/

## Auth como módulo reutilizavel

O modulo `auth` foi dividido em tres camadas para facilitar reuso em outros projetos:

- `login-view.tsx`: somente JSX e props agrupadas, sem regra de negocio.
- `use-login-model.ts`: estado, validacao, normalizacao e acoes mockadas.
- `login-view-model.tsx`: composicao entre View + Model e ponto de entrada da feature.
- `content/login-copy.ts`: textos e copy visual centralizados.
- `utils/room-code.ts`: helpers puros reutilizaveis.

A ideia e que a View seja portavel para outro design system, enquanto a Model permanece reutilizavel como contrato de comportamento.
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
