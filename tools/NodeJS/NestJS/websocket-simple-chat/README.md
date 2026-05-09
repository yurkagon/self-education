# WebSocket simple chat

A small **[NestJS](https://nestjs.com/)** demo: clients connect over **[Socket.IO](https://socket.io/)**, send messages via a WebSocket event, and messages are persisted in **PostgreSQL** with **[Prisma](https://www.prisma.io/)**. The HTTP API routes for auth/users are disabled in code; only the chat gateway is wired in [`src/api/api.module.ts`](src/api/api.module.ts).

## Features

- **Socket.IO gateway** — validates payloads with `class-validator`/`ValidationPipe`.
- **Persistence** — each accepted message is stored as a `Message` row (`id`, `message` text).
- **Broadcast** — after save, the server emits `chat-message` to all connected clients with `{ id, message }`.

## Protocol (client ↔ server)

| Direction | Event | Payload / body |
|-----------|--------|----------------|
| Client → server | `send-message` | `{ "text": string }` — 1–8192 characters |
| Server → all clients | `chat-message` | `{ "id": string, "message": string }` |

Connect Socket.IO to the same host and port as the Nest app (default **3000**), e.g. `http://localhost:3000` (the client library negotiates `/socket.io`).

## Requirements

- **Node.js** (current LTS recommended)
- **npm** (or compatible package manager)
- **Docker** — optional; used via `docker compose` for PostgreSQL

## Quick start

### 1. Install dependencies

```bash
npm install
```

### 2. Environment

Create a `.env` in the project root (this repo uses **`@dotenvx/dotenvx`** loading from `main.ts`). You need:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL URL for Prisma (e.g. `postgresql://USER:PASSWORD@localhost:5432/DBNAME?schema=public`) |
| `PORT` | (optional) HTTP port; defaults to **3000** |

If you use the included Compose file, define postgres settings in `.env` as referenced in [`docker-compose.yml`](docker-compose.yml), for example:

- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB_NAME`

and set `DATABASE_URL` to match (user, password, database name, host `localhost`, port **5432**).

### 3. Database

Start PostgreSQL (if you use Compose):

```bash
npm run db:start
```

Generate the Prisma client and apply the schema:

```bash
npm run db:generate
npm run db:push
```

Optional — open Prisma Studio:

```bash
npm run db:view
```

### 4. Run the app

Development (watch mode):

```bash
npm run start:dev
```

Production build:

```bash
npm run build
npm run start:prod
```

## npm scripts

| Script | Description |
|--------|-------------|
| `start` / `start:dev` / `start:debug` | Run the Nest application |
| `build` | Compile TypeScript |
| `start:prod` | Run compiled app (`node dist/main`) |
| `db:start` | `docker compose up` (PostgreSQL) |
| `db:generate` | `prisma generate` |
| `db:push` | Push schema to the database |
| `db:view` | Prisma Studio |
| `lint`, `format`, `test`, `test:e2e` | Quality and tests |

## Project layout

- [`src/main.ts`](src/main.ts) — Nest bootstrap, global `ValidationPipe`, `cookie-parser`.
- [`src/app.module.ts`](src/app.module.ts) — `ConfigModule`, `ApiModule`, `PrismaModule`.
- [`src/api/chat/`](src/api/chat/) — `ChatGateway` (Socket.IO), `ChatService`, `SendMessageDto`.
- [`src/prisma/`](src/prisma/) — Prisma module and service.
- [`prisma/schema/`](prisma/schema/) — Prisma schema; client output is [`generated/prisma`](generated/prisma).

## License

See the `license` field in [`package.json`](package.json).
