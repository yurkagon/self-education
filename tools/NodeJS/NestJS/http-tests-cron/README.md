# http-tests-cron

Навчальний **NestJS**-застосунок: робота з **PostgreSQL** через **Prisma**, вихідні **HTTP**-запити через **Axios**, періодичні задачі (**@nestjs/schedule**), завантаження файлів і простий CRUD для сутності «артист».

API версіонується URI-префіксом **`/v1`** (див. `main.ts`).

## Що є в проєкті

| Модуль | Опис |
|--------|------|
| **Artist** | Список, один запис за `id`, створення (`POST`). Модель Prisma: `Artist` (`name`, `genre`). |
| **HTTP demo** | `GET /v1/demo/http/posts/:id` — проксі до [JSONPlaceholder](https://jsonplaceholder.typicode.com) через `HttpModule`. |
| **File** | `POST /v1/file/upload` — завантаження зображення (JPEG/PNG, до 5 MB) у каталог `uploads/`. Статика доступна за **`/static`** (`ServeStaticModule`). |
| **Stamp** | `GET /v1/stamp` — приклад модуля з **динамічною реєстрацією** (`StampModule.register({ headline })`). |
| **Task** | Cron кожні 30 с, інтервал 1 с, разовий таймаут після старту — для експериментів з `@nestjs/schedule`. |

Додатково: глобальний **ValidationPipe**, **CORS**, **cookie-parser**, **CustomLogger**, конфіг через **`@nestjs/config`** та **`@dotenvx/dotenvx`**.

## Структура (скорочено)

```
prisma/
  schema/schema.prisma    # модель Artist, клієнт → generated/prisma
prisma.config.ts          # datasource для Prisma CLI
src/
  api/                    # artist, file, http-demo, stamp
  prisma/                 # PrismaModule, PrismaService
  task/                   # Cron / Interval / Timeout
  common/                 # логер, декоратори
  app.module.ts
  main.ts
bruno/                    # колекція Bruno для локальних запитів
uploads/                  # створюється при завантаженні файлів
```

## Вимоги

- Node.js **≥ 18.17**
- PostgreSQL (локально або через Docker)

## Запуск

### 1. Залежності

```bash
npm install
```

### 2. Змінні середовища

Створіть `.env` у корені. Для Docker Compose з репозиторію потрібні ще змінні для Postgres:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DB_NAME?schema=public"

POSTGRES_USER=USER
POSTGRES_PASSWORD=PASSWORD
POSTGRES_DB_NAME=DB_NAME
```

`DATABASE_URL` має відповідати тим самим обліковим даним і імені БД, що й контейнер.

### 3. База даних

```bash
docker compose up -d
```

Або підключіть власний інстанс PostgreSQL і задайте лише `DATABASE_URL`.

### 4. Схема та Prisma Client

```bash
npm run db:push
npm run db:generate
```

### 5. Додаток

```bash
npm run start:dev
```

За замовчуванням сервер слухає порт **`3000`** (`PORT` у `.env` за бажанням).

## Приклади запитів

Базовий URL: `http://localhost:3000`.

### Артисти

```http
GET http://localhost:3000/v1/artists
GET http://localhost:3000/v1/artists/:id
```

```http
POST http://localhost:3000/v1/artists
Content-Type: application/json

{
  "name": "Тарас Чубай",
  "genre": "rock"
}
```

### HTTP-демо (зовнішній API)

```http
GET http://localhost:3000/v1/demo/http/posts/1
```

### Завантаження файлу

```http
POST http://localhost:3000/v1/file/upload
Content-Type: multipart/form-data

file: <binary JPEG або PNG>
```

Файл потім можна відкрити як статику: `http://localhost:3000/static/<ім’я_файлу>`.

### Bruno

У каталозі **`bruno/`** є запити під середовище `environments/local.bru` (`host`, приклад `sampleArtistId`).

## Скрипти npm

| Команда | Опис |
|---------|------|
| `npm run start:dev` | розробка з hot reload |
| `npm run build` / `npm run start:prod` | збірка та продакшен-запуск |
| `npm run db:start` | `docker compose up` (foreground) |
| `npm run db:push` | застосувати схему до БД |
| `npm run db:generate` | згенерувати Prisma Client у `generated/prisma` |
| `npm run db:view` | Prisma Studio |
| `npm run test` | unit-тести |
| `npm run test:e2e` | e2e (потрібна налаштована БД / моки з тестів) |

Для продакшену раціональніше використовувати **Prisma Migrate** замість лише `db push`.

## Технології

NestJS 11, Prisma 7, PostgreSQL (`pg` + `@prisma/adapter-pg`), `@nestjs/axios`, `@nestjs/schedule`, `class-validator`, Docker Compose, Bruno.
