# NestJS + Prisma (PostgreSQL)

Навчальний проєкт на NestJS з доступом до PostgreSQL через **Prisma**. Є модулі фільмів, акторів і відгуків, базові CRUD-операції та приклади зв’язків між моделями.

## Що демонструє проєкт

### Зв’язки в схемі Prisma (`prisma/schema/`)

- **One-to-many** — фільм → відгуки (`Movie.reviews`, `Review.movie`)
- **Many-to-many** — фільми ↔ актори (implicit join через Prisma)
- **One-to-one** — фільм ↔ постер (`Movie.poster`, `MoviePoster.movie`)
- **Many-to-one** — відгук → фільм (`Review.movieId`)

### Практики

- Схема БД у Prisma, клієнт згенерований у `generated/prisma`
- `PrismaService` (глобальний модуль) + репозиторії через `this.prisma.*`
- DTO з `class-validator` / `class-transformer`
- OpenCollection Bruno у каталозі `bruno/`

## Структура проєкту (скорочено)

```
prisma/
  schema/                 # моделі Prisma (розбиті по файлах)
prisma.config.ts          # datasource URL для Prisma CLI
src/
  api/                    # Movie, Actor, Review
  prisma/                 # PrismaModule, PrismaService
  app.module.ts
```

## Запуск

### 1. Залежності

```bash
npm install
```

### 2. Змінні середовища

У корені створіть `.env` (приклад):

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/nestjs_course?schema=public"
```

Якщо використовуєте Docker з іншими іменами змінних — зведіть їх до одного `DATABASE_URL` для Prisma.

### 3. PostgreSQL

```bash
docker compose up -d
```

### 4. Схема БД і Prisma Client

```bash
npm run db:push
npm run db:generate
```

### 5. Додаток

```bash
npm run start:dev
```

API: `http://localhost:3000` (порт за замовчуванням з `main.ts`).

## Приклади API

### Фільми

```http
POST http://localhost:3000/movie
Content-Type: application/json

{
  "title": "The Matrix",
  "description": "A sci-fi movie",
  "releaseYear": 1999,
  "isPublished": true,
  "url": "https://example.com/poster.jpg"
}
```

```http
GET http://localhost:3000/movie
GET http://localhost:3000/movie?search=matrix
GET http://localhost:3000/movie/:id
```

```http
POST http://localhost:3000/movie/:id/actor
Content-Type: application/json

{ "actorId": "<uuid-актора>" }
```

### Актори

```http
POST http://localhost:3000/actor
Content-Type: application/json

{ "name": "Tom Hanks" }
```

```http
GET http://localhost:3000/actor
GET http://localhost:3000/actor/:id/movie
```

### Відгуки

```http
POST http://localhost:3000/review
Content-Type: application/json

{
  "movieId": "<uuid-фільму>",
  "rating": 8.5,
  "text": "Great movie!"
}
```

## Технології

- **NestJS**
- **Prisma** + **PostgreSQL** (`@prisma/adapter-pg`, `pg`)
- **Docker** (опційно для БД)
- **class-validator** / **class-transformer**

## Скрипти БД

| Команда           | Опис                |
|-------------------|---------------------|
| `npm run db:push` | застосувати схему   |
| `npm run db:generate` | згенерувати клієнт |
| `npm run db:view` | Prisma Studio       |

Для продакшену краще використовувати **Prisma Migrate** замість лише `db push`.
