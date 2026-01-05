# NestJS TypeORM Examples

Навчальний проект, що демонструє використання TypeORM з NestJS. Проект містить приклади різних типів зв'язків між сутностями та базові CRUD операції.

## 🎯 Що демонструє проект

### Типи зв'язків TypeORM:

- **OneToMany** - Фільм → Відгуки (один фільм має багато відгуків)
- **ManyToMany** - Фільми ↔ Актори (багато фільмів мають багато акторів)
- **OneToOne** - Фільм ↔ Постер (один фільм має один постер)
- **ManyToOne** - Відгук → Фільм (багато відгуків належать одному фільму)

### Основні концепції:

- Створення entities з різними типами колонок (`varchar`, `text`, `enum`, `decimal`, `uuid`)
- Використання декораторів TypeORM (`@Entity`, `@Column`, `@PrimaryGeneratedColumn`, `@CreateDateColumn`, `@UpdateDateColumn`)
- Налаштування зв'язків між сутностями (`@OneToMany`, `@ManyToMany`, `@OneToOne`, `@ManyToOne`)
- Використання `@JoinTable` та `@JoinColumn` для налаштування зв'язків
- Transformer для конвертації даних (`decimal` → `number`)
- Enum типи для обмеження значень
- Cascade операції (`onDelete: 'CASCADE'`)
- Repository pattern з TypeORM
- DTO валідація з `class-validator`

## 📁 Структура проекту

```
src/
├── api/
│   ├── api.module.ts          # Головний модуль API
│   ├── movie/                  # Модуль фільмів
│   │   ├── entities/
│   │   │   ├── movie.entity.ts
│   │   │   └── poster.entity.ts
│   │   ├── dto/
│   │   ├── movie.service.ts
│   │   ├── movie.controller.ts
│   │   └── movie.module.ts
│   ├── actor/                  # Модуль акторів
│   └── review/                 # Модуль відгуків
├── config/
│   └── typeorm.config.ts       # Конфігурація TypeORM
└── app.module.ts
```

## 🚀 Запуск проекту

### 1. Встановити залежності

```bash
npm install
```

### 2. Налаштувати базу даних

Створіть файл `.env` в корені проекту:

```env
POSTGRES_USER=root
POSTGRES_PASSWORD=123456
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB_NAME=nestjs_course
```

### 3. Запустити PostgreSQL через Docker

```bash
docker compose up -d
```

### 4. Запустити додаток

```bash
npm run start:dev
```

Додаток буде доступний на `http://localhost:3000`

## 📚 Приклади використання API

### Фільми (Movies)

```bash
# Створити фільм
POST http://localhost:3000/movie
{
  "title": "The Matrix",
  "description": "A sci-fi movie",
  "genre": "action"
}

# Отримати всі фільми
GET http://localhost:3000/movie

# Пошук фільмів
GET http://localhost:3000/movie?search=matrix

# Отримати один фільм
GET http://localhost:3000/movie/:id

# Додати актора до фільму
POST http://localhost:3000/movie/:id/actor
{
  "actorId": "uuid-актора"
}
```

### Актори (Actors)

```bash
# Створити актора
POST http://localhost:3000/actor
{
  "name": "Tom Hanks"
}

# Отримати всіх акторів
GET http://localhost:3000/actor

# Отримати фільми актора
GET http://localhost:3000/actor/:id/movie
```

### Відгуки (Reviews)

```bash
# Створити відгук
POST http://localhost:3000/review
{
  "movieId": "uuid-фільму",
  "rating": 8.5,
  "text": "Great movie!"
}

# Отримати всі відгуки
GET http://localhost:3000/review
```

## 🔗 Типи зв'язків в проекті

### OneToMany (Movie → Reviews)
```typescript
// MovieEntity
@OneToMany(() => ReviewEntity, (review) => review.movie)
reviews: ReviewEntity[];

// ReviewEntity
@ManyToOne(() => MovieEntity, (movie) => movie.reviews)
movie: MovieEntity;
```

### ManyToMany (Movie ↔ Actor)
```typescript
// MovieEntity
@ManyToMany(() => ActorEntity, (actor) => actor.movies)
@JoinTable({ name: 'movie_actors' })
actors: ActorEntity[];

// ActorEntity
@ManyToMany(() => MovieEntity, (movie) => movie.actors)
movies: MovieEntity[];
```

### OneToOne (Movie ↔ Poster)
```typescript
// MovieEntity
@OneToOne(() => PosterEntity, (poster) => poster.movie)
@JoinColumn()
poster: PosterEntity;

// PosterEntity
@OneToOne(() => MovieEntity, (movie) => movie.poster)
movie: MovieEntity;
```

## 🛠 Технології

- **NestJS** - Node.js framework
- **TypeORM** - ORM для роботи з базою даних
- **PostgreSQL** - База даних
- **Docker** - Контейнеризація
- **class-validator** - Валідація DTO
- **class-transformer** - Трансформація даних

## 📖 Основні концепції TypeORM

- **Entities** - Класи, що представляють таблиці в БД
- **Repositories** - Абстракція для роботи з даними
- **Relations** - Зв'язки між сутностями
- **Decorators** - Декоратори для налаштування колонок та зв'язків
- **Migrations** - Міграції бази даних (через `synchronize: true` в dev режимі)

## 📝 Примітки

- Проект використовує `synchronize: true` для автоматичної синхронізації схеми БД (тільки для розробки)
- В продакшні використовуйте міграції замість `synchronize`
- Всі entities знаходяться в папці `api/` для кращої організації коду
