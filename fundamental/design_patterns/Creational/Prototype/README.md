# Патерн Prototype (Прототип)

## Опис

Prototype - це креаційний патерн проектування, який дозволяє створювати нові об'єкти шляхом клонування існуючих об'єктів (прототипів) замість створення їх з нуля. Патерн використовує механізм клонування для створення об'єктів.

## Основні принципи

- **Клонування**: Створення об'єктів через копіювання існуючих
- **Прототип**: Базовий об'єкт для клонування
- **Гнучкість**: Можливість створювати варіанти об'єкта
- **Ефективність**: Уникнення дорогої операції створення з нуля
- **Налаштування**: Можливість модифікувати клоновані об'єкти

## Переваги

- ✅ Уникнення дорогої операції створення об'єктів
- ✅ Гнучкість у створенні варіантів об'єктів
- ✅ Динамічне створення об'єктів
- ✅ Зменшення кількості підкласів
- ✅ Підтримка складних ініціалізацій
- ✅ Легке створення копій об'єктів

## Недоліки

- ❌ Складність клонування складних об'єктів
- ❌ Проблеми з глибоким клонуванням
- ❌ Може призвести до неочікуваної поведінки
- ❌ Складність у налагодженні
- ❌ Потенційні проблеми з пам'яттю

## Коли використовувати

- Коли створення об'єкта дороге або складне
- Коли потрібно створювати багато схожих об'єктів
- Коли хочете уникнути створення підкласів
- Коли потрібно динамічно створювати об'єкти
- Коли об'єкти мають складну ініціалізацію

## Структура патерну

### Компоненти

1. **Prototype** - абстрактний прототип
2. **Concrete Prototype** - конкретний прототип
3. **Client** - клієнт, який використовує прототип
4. **Clone Method** - метод клонування

## Реалізація (base.ts)

### Аналіз коду

```typescript
class Prototype {
  private someValue = 1;

  public clone(): Prototype {
    // `return _.cloneDeep(this);` would be better
    return Object.create(this);
  }
}
```

#### 1. Базовий клас Prototype

**Особливості:**
- **Приватний стан**: `someValue` - внутрішній стан об'єкта
- **Метод клонування**: `clone()` - створює копію об'єкта
- **Простий підхід**: Використання `Object.create()`

#### 2. Метод клонування

```typescript
public clone(): Prototype {
  return Object.create(this);
}
```

**Особливості:**
- **Поверхневе клонування**: `Object.create()` створює новий об'єкт
- **Прототипне наслідування**: Новий об'єкт наслідує від поточного
- **Коментар**: Вказує на кращий підхід з `_.cloneDeep()`

## Типи клонування

### 1. Shallow Clone (Поверхневе клонування)
```typescript
public clone(): Prototype {
  return Object.create(this);
}
```

**Особливості:**
- Клонує тільки перший рівень властивостей
- Вкладені об'єкти посилаються на оригінал
- Швидке, але може призвести до проблем

### 2. Deep Clone (Глибоке клонування)
```typescript
public clone(): Prototype {
  return _.cloneDeep(this);  // Lodash
  // або
  return JSON.parse(JSON.stringify(this));
}
```

**Особливості:**
- Клонує всі рівні вкладеності
- Повністю незалежні об'єкти
- Повільніше, але безпечніше

### 3. Custom Clone (Власне клонування)
```typescript
public clone(): Prototype {
  const cloned = new Prototype();
  cloned.someValue = this.someValue;
  return cloned;
}
```

**Особливості:**
- Повний контроль над процесом
- Можна додати логіку клонування
- Найбільш гнучкий підхід

## Розширення функціональності

### Додавання нових властивостей

```typescript
class Prototype {
  private someValue = 1;
  private name: string = '';
  private items: string[] = [];

  public clone(): Prototype {
    const cloned = new Prototype();
    cloned.someValue = this.someValue;
    cloned.name = this.name;
    cloned.items = [...this.items];  // Копіювання масиву
    return cloned;
  }

  public setName(name: string): Prototype {
    this.name = name;
    return this;
  }

  public addItem(item: string): Prototype {
    this.items.push(item);
    return this;
  }
}
```

### Додавання валідації

```typescript
class Prototype {
  private someValue = 1;

  public clone(): Prototype {
    if (this.someValue < 0) {
      throw new Error('Cannot clone invalid prototype');
    }
    
    const cloned = new Prototype();
    cloned.someValue = this.someValue;
    return cloned;
  }
}
```

### Створення різних варіантів

```typescript
class Prototype {
  private someValue = 1;

  public clone(): Prototype {
    return Object.create(this);
  }

  public cloneWithModification(modifier: number): Prototype {
    const cloned = this.clone();
    cloned.someValue += modifier;
    return cloned;
  }
}
```

## Приклади використання

### 1. Графічні об'єкти
```typescript
class Shape {
  private color: string;
  private position: { x: number; y: number };

  public clone(): Shape {
    return Object.create(this);
  }
}

const circle = new Shape();
const clonedCircle = circle.clone();
```

### 2. Конфігурація
```typescript
class Config {
  private settings: Record<string, any>;

  public clone(): Config {
    return Object.create(this);
  }
}

const defaultConfig = new Config();
const userConfig = defaultConfig.clone();
```

### 3. База даних
```typescript
class DatabaseConnection {
  private connectionString: string;
  private poolSize: number;

  public clone(): DatabaseConnection {
    return Object.create(this);
  }
}
```

## Порівняння з іншими патернами

### Prototype vs Factory
- **Prototype**: Клонування існуючих об'єктів
- **Factory**: Створення нових об'єктів з нуля

### Prototype vs Builder
- **Prototype**: Швидке клонування
- **Builder**: Покрокове створення складних об'єктів

### Prototype vs Singleton
- **Prototype**: Множинні копії
- **Singleton**: Єдиний екземпляр

## JavaScript/TypeScript особливості

### Object.create() vs new
```typescript
// Object.create() - прототипне наслідування
const cloned = Object.create(original);

// new - створення нового екземпляра
const cloned = new OriginalClass();
```

### JSON клонування
```typescript
// Простий спосіб глибокого клонування
const cloned = JSON.parse(JSON.stringify(original));
```

### Lodash клонування
```typescript
import _ from 'lodash';

// Глибоке клонування
const cloned = _.cloneDeep(original);

// Поверхневе клонування
const cloned = _.clone(original);
```

## Альтернативи

1. **Factory Pattern** - для створення нових об'єктів
2. **Builder Pattern** - для складних об'єктів
3. **Object.assign()** - для простого копіювання
4. **Spread operator** - для копіювання властивостей

## Висновок

Prototype - це потужний патерн для створення об'єктів через клонування. Він особливо корисний коли створення об'єкта дороге або складне, або коли потрібно створювати багато схожих об'єктів. Патерн забезпечує гнучкість та ефективність, але потребує обережності при роботі з глибоким клонуванням.
