# Portfolio Builder

Full-stack portfolio with React admin panel and Express API backed by MongoDB.

## Run & Operate

- `npm run dev:server` — API server (port 8080) — **start this before the client**
- `npm run dev:client` — frontend (port from `CLIENT_PORT` in `.env`; proxies `/api` to the server)
- `npm run typecheck` — full typecheck across packages
- `npm run build` — typecheck + build all packages
- `npm run codegen` — regenerate API hooks and Zod schemas from OpenAPI
- `npm run seed` — seed MongoDB with demo data
- Copy `.env.example` to `.env` and set `DATABASE_URL`

## Stack

- npm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: MongoDB + Mongoose
- Validation: Zod (OpenAPI-generated schemas in `@workspace/api-zod`)
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (server bundle)

## Where things live

- `client/` — React + Vite frontend (portfolio site + admin panel)
- `server/` — Express API server
- `lib/db/` — MongoDB models (Mongoose)
- `lib/api-spec/openapi.yaml` — API contract (source of truth for Orval codegen)
