# Патерн Builder (Будівельник)

Покрокове створення складних об'єктів.

## Опис

Builder - це креаційний патерн проектування, який дозволяє створювати складні об'єкти покроково. Патерн дозволяє виробляти різні типи та представлення об'єкта, використовуючи той самий код будівництва.

## Основні принципи

- **Покрокове створення**: Об'єкт створюється по частинах
- **Гнучкість**: Можна створювати різні варіанти об'єкта
- **Читабельність**: Код створення стає більш зрозумілим
- **Валідація**: Можна перевіряти параметри на кожному кроці
- **Необов'язкові параметри**: Легко працювати з опціональними полями

## Переваги

- ✅ Покрокове створення складних об'єктів
- ✅ Читабельний та зрозумілий код
- ✅ Гнучкість у створенні різних варіантів
- ✅ Ізоляція складної логіки створення
- ✅ Підтримка необов'язкових параметрів
- ✅ Валідація на кожному кроці

## Недоліки

- ❌ Збільшує кількість класів у системі
- ❌ Може бути надмірним для простих об'єктів
- ❌ Ускладнює архітектуру
- ❌ Додатковий код для підтримки

## Коли використовувати

- Коли об'єкт має багато параметрів
- Коли потрібно створювати різні варіанти об'єкта
- Коли параметри необов'язкові або мають значення за замовчуванням
- Коли потрібна валідація параметрів під час створення
- Коли конструктор стає надто складним

## Структура патерну

### Компоненти

1. **Builder** - абстрактний будівельник
2. **Concrete Builder** - конкретний будівельник
3. **Product** - продукт, що створюється
4. **Director** - директор (опціонально)
5. **Client** - клієнт, який використовує будівельник

## Реалізація (base.ts)

### Аналіз коду

#### 1. Builder (UserBuilder)

```typescript
class UserBuilder {
  private name: string;
  private age: number;
  private phone: string;
  private address: string;

  constructor(name: string) {
    this.name = name;
  }

  setAge(value: number): UserBuilder {
    this.age = value;
    return this;  // Повертає this для ланцюжкових викликів
  }

  setPhone(value: string): UserBuilder {
    this.phone = value;
    return this;
  }

  setAddress(value: string): UserBuilder {
    this.address = value;
    return this;
  }

  build(): User {
    return new User(this);  // Створює фінальний об'єкт
  }
}
```

**Особливості:**
- **Fluent Interface**: Методи повертають `this` для ланцюжкових викликів
- **Покрокове створення**: Кожен метод встановлює одну властивість
- **Валідація**: Можна додати перевірки в кожен метод
- **Гнучкість**: Необов'язкові параметри можна пропустити

#### 2. Product (User)

```typescript
class User {
  private name: string;
  private age: number;
  private phone: string;
  private address: string;

  constructor(builder: UserBuilder) {
    this.name = builder.Name;
    this.age = builder.Age;
    this.phone = builder.Phone;
    this.address = builder.Address;
  }

  // Тільки геттери - об'єкт immutable після створення
  get Name() { return this.name; }
  get Age() { return this.age; }
  get Phone() { return this.phone; }
  get Address() { return this.address; }
}
```

**Особливості:**
- **Immutable**: Об'єкт не змінюється після створення
- **Тільки геттери**: Немає сеттерів для зміни стану
- **Конструктор з Builder**: Приймає готовий Builder
- **Інкапсуляція**: Приватні поля з публічними геттерами

#### 3. Використання

```typescript
const user: User = new UserBuilder("Jancsi")
  .setAge(12)
  .setPhone("0123456789")
  .setAddress("asdf")
  .build();
```

**Особливості:**
- **Ланцюжкові виклики**: Методи викликаються по черзі
- **Читабельність**: Код легко читається та розуміється
- **Гнучкість**: Можна пропустити необов'язкові параметри
- **Валідація**: Можна додати перевірки перед `build()`

## Типи Builder патернів

### 1. Simple Builder (Простий)
- Один клас Builder
- Без Director
- Найпростіша реалізація

### 2. Fluent Builder
- Методи повертають `this`
- Ланцюжкові виклики
- Покращена читабельність

### 3. Step Builder
- Кожен крок має свій інтерфейс
- Компілятор перевіряє правильність послідовності
- Найбезпечніший варіант

### 4. Generic Builder
- Універсальний Builder для різних типів
- Використовує дженерики
- Максимальна гнучкість

## Розширення функціональності

### Додавання валідації

```typescript
class UserBuilder {
  setAge(value: number): UserBuilder {
    if (value < 0 || value > 150) {
      throw new Error('Invalid age');
    }
    this.age = value;
    return this;
  }

  build(): User {
    if (!this.name) {
      throw new Error('Name is required');
    }
    return new User(this);
  }
}
```

### Додавання нових параметрів

```typescript
class UserBuilder {
  private email: string;

  setEmail(value: string): UserBuilder {
    this.email = value;
    return this;
  }

  get Email() {
    return this.email;
  }
}
```

### Створення різних варіантів

```typescript
// Мінімальний користувач
const minimalUser = new UserBuilder("John").build();

// Повний користувач
const fullUser = new UserBuilder("John")
  .setAge(25)
  .setPhone("123456789")
  .setAddress("123 Main St")
  .setEmail("john@example.com")
  .build();
```

## Приклади використання

### 1. SQL Query Builder
```typescript
const query = new QueryBuilder()
  .select(['name', 'email'])
  .from('users')
  .where('age > 18')
  .orderBy('name')
  .build();
```

### 2. HTTP Request Builder
```typescript
const request = new RequestBuilder()
  .url('https://api.example.com')
  .method('POST')
  .header('Content-Type', 'application/json')
  .body({ name: 'John' })
  .build();
```

### 3. Configuration Builder
```typescript
const config = new ConfigBuilder()
  .database('postgresql')
  .host('localhost')
  .port(5432)
  .username('admin')
  .password('secret')
  .build();
```

## Порівняння з іншими патернами

### Builder vs Factory
- **Builder**: Складні об'єкти з багатьма параметрами
- **Factory**: Прості об'єкти з невеликою кількістю параметрів

### Builder vs Constructor
- **Builder**: Гнучкість, читабельність, валідація
- **Constructor**: Простота, швидкість

### Builder vs Object Literal
- **Builder**: Типізація, валідація, логіка
- **Object Literal**: Простота, швидкість

## Альтернативи

1. **Factory Pattern** - для простих об'єктів
2. **Constructor** - для об'єктів з невеликою кількістю параметрів
3. **Object Literal** - для простих структур даних
4. **Dependency Injection** - для ін'єкції залежностей

## Висновок

Builder - це потужний патерн для створення складних об'єктів. Він особливо корисний коли об'єкт має багато параметрів, необов'язкові поля або потребує валідації. Патерн покращує читабельність коду та робить створення об'єктів більш гнучким, але може ускладнити архітектуру для простих випадків.
