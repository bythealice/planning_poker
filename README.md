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

### Fluxo de autenticacao atual (MVP)

- `Visitante` (`visitor`): entra com nome + codigo da sala, sem e-mail.
- `Entrar` (`signin`): exige e-mail + senha e libera a etapa 2 (criar sala ou entrar com codigo) somente apos autenticar.
- No modo `Entrar`, existe acao `Criar conta` que leva para `/signup` com formulario (nome, e-mail, senha e confirmacao de senha).
- Sem backend ainda, a verificacao de conta e simulada localmente para preparar a integracao futura com Appwrite Auth.
- O nome do usuario e persistido localmente para melhorar a experiencia no retorno ao app.
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
npm run typecheck:cypress
npm run build
```

## Cypress

O projeto já vem com Cypress configurado para:

- `e2e`: fluxo completo da tela de login em `cypress/e2e/login.cy.ts`
- `component`: teste isolado da View em `cypress/component/login-view.cy.tsx`

Comandos principais:

```bash
npm run cy:open
npm run cy:run:e2e
npm run cy:run:component
npm run test:e2e
npm run test:component
```

O suporte de testes inclui:

- `cypress/support/commands.ts`: comandos reutilizáveis como `getByCy` e `visitLogin`
- `cypress/support/component.ts`: montagem da View com CSS global carregado
- `cypress/support/component-index.html`: container base exigido pelo runner de component testing
- `cypress/support/mocks/next-image.tsx`: mock do `next/image` para testes de componente
- `vite.config.ts`: alias `@` e stub do `next/image` para o component testing

## Docker

```bash
cp .env.example .env.local
docker compose up --build
```

App em `http://localhost:3000`.
