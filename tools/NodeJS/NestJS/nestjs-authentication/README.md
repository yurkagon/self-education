# NestJS Authentication API

A NestJS backend with JWT authentication stored in **httpOnly cookies**, **PostgreSQL** via **Prisma**, **OpenAPI/Swagger** docs, and **Bruno** request collections.

## Features

- **REST API:** authentication (`register`, `login`, `refresh`, `logout`, `GET /auth/me`) and a protected user route `GET /user` (list users without password fields).
- **Security:** Argon2 password hashing, access/refresh token pair, refresh without re-login, logout clears cookies.
- **Integration:** Passport JWT with `JwtStrategy` reading the access token from cookies.
- **API docs:** Swagger UI at [`/docs`](http://localhost:3000/docs) (default local port `3000`).
- **Manual testing:** `bruno/` workspace with environments (e.g. `local` using `baseUrl`).

## Requirements

- Current Node.js LTS
- npm or another compatible package manager
- Docker (optional, if you run PostgreSQL via the repo’s `docker compose`)

## Quick start

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create a `.env` in the project root (or configure loading the same way as **dotenvx** elsewhere). Minimal set:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string for Prisma |
| `JWT_SECRET` | Secret used to sign JWTs |
| `JWT_EXPIRATION_TIME` | Access token lifetime (`ms`-compatible values, e.g. `15m`) |
| `JWT_REFRESH_EXPIRATION_TIME` | Refresh token lifetime (e.g. `7d`) |
| `COOKIE_DOMAIN` | Cookie `Domain` attribute (often `localhost` for local dev) |
| `PORT` | (optional) HTTP port; defaults to `3000` |

### 3. Database

PostgreSQL must be reachable at `DATABASE_URL`. To start services defined in the repo:

```bash
npm run db:start
```

Apply the schema and generate the Prisma client:

```bash
npm run db:generate
npm run db:push
```

Browse data when needed:

```bash
npm run db:view
```

### 4. Run the app

Development with reload:

```bash
npm run start:dev
```

Production: build, then run the compiled entry (`node dist/src/main.js` — see `start:prod` in `package.json`).

```bash
npm run build
npm run start:prod
```

## npm scripts

| Script | Description |
|--------|-------------|
| `start` / `start:dev` / `start:debug` | Nest CLI run modes |
| `build` | Compile the project |
| `start:prod` | Run the compiled app (`node …`) |
| `db:start` | Bring up Docker Compose services |
| `db:push` | Push Prisma schema to the database (no migrations) |
| `db:generate` | `prisma generate` |
| `db:view` | Prisma Studio |
| `lint`, `format`, `test`, `test:e2e` | Linting, formatting, tests |

## Project layout

- `src/main.ts` — bootstrap, global pipes, `cookie-parser`, Swagger wiring.
- `src/app.module.ts` — root module, global `ConfigModule`.
- `src/api/` — HTTP modules **`auth`** and **`user`**, DTOs and decorators for authorized routes.
- `src/prisma/` — Prisma integration.
- `prisma/schema/` — Prisma model files; client output is **`generated/prisma`** (see `schema.prisma`).
- `src/types/` — Express type augmentation for `request.user`, etc.

## Swagger and cookies

On `/docs`, Swagger reflects cookie auth: after `register` or `login`, clients receive `accessToken` and `refreshToken`; protected routes expect those cookies. Use `refresh` and `logout` for rotating or clearing tokens.

## Bruno

Under `bruno/` you’ll find collections for exercising the API; set `baseUrl` in the environment (for example `bruno/environments/local.yml`).

## License

See the `license` field in `package.json`.
