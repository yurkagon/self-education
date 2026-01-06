# Патерн Chain of Responsibility (Ланцюжок відповідальності)

Middleware (AuthMiddleware, RoleMiddleware) обробляють запити по ланцюжку

## Опис

Chain of Responsibility - це патерн поведінки, який дозволяє передавати запити по ланцюжку обробників. Кожен обробник вирішує, чи обробити запит, чи передати його наступному обробнику в ланцюжку. Це дуже поширений патерн у веб-розробці для створення middleware-ланцюжків (автентифікація, авторизація, валідація тощо).

## Основні принципи

- **Ланцюжок**: Запити передаються по ланцюжку обробників
- **Вибір**: Кожен обробник вирішує, чи обробити запит
- **Передача**: Якщо не може обробити, передає далі
- **Гнучкість**: Легко додавати та видаляти обробники
- **Розділення**: Кожен обробник має одну відповідальність

## Переваги

- ✅ Розділяє відповідальності між обробниками
- ✅ Дозволяє динамічно змінювати ланцюжок
- ✅ Уникає жорсткого зв'язування відправника та отримувача
- ✅ Легко додавати нових обробників
- ✅ Підтримує принцип єдиної відповідальності
- ✅ Гнучкість у обробці запитів

## Недоліки

- ❌ Може призвести до неочікуваної поведінки
- ❌ Складність у відстеженні ланцюжка
- ❌ Може зменшити продуктивність
- ❌ Потенційні проблеми з обробкою запитів
- ❌ Складність у налагодженні

## Коли використовувати

- **Middleware в веб-фреймворках** - автентифікація, авторизація, валідація
- Коли потрібно обробляти запити різними способами
- Коли хочете уникнути жорсткого зв'язування
- Коли потрібна гнучкість у обробці запитів
- Коли хочете розділити відповідальності
- Коли потрібна динамічна зміна обробників
- **Обробка HTTP запитів** - Express.js, Koa.js middleware
- **Валідація даних** - послідовна перевірка різних правил

## Структура патерну

### Компоненти

1. **Middleware** - базовий абстрактний клас обробника
2. **ConcreteMiddleware** - конкретні обробники (AuthMiddleware, RoleMiddleware)
3. **Client** - клієнт (відправляє запити через clientCode)

## Реалізація (base.ts)

### Аналіз коду

#### 1. Middleware (Базовий обробник)
```typescript
abstract class Middleware {
  private nextHandler: Middleware;

  public setNext(handler: Middleware): Middleware {
    this.nextHandler = handler;
    return handler; // Дозволяє ланцюжкове викликання
  }

  public handle(request: string): string {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    // Якщо немає наступного обробника, повертає undefined
  }
}
```

**Особливості:**
- **Абстрактний клас**: Базовий клас для всіх middleware
- **Зберігання**: Зберігає посилання на наступний обробник
- **Передача**: Передає запит наступному обробнику, якщо він є
- **Ланцюжкове викликання**: setNext() повертає handler для зручності
- **Базовий клас**: Надає загальну логіку для всіх обробників

#### 2. Concrete Middleware
```typescript
class AuthMiddleware extends Middleware {
  public handle(request: string): string {
    console.log("AuthMiddleware: Checking authentication");
    return super.handle(request); // Завжди передає далі
  }
}

class RoleMiddleware extends Middleware {
  public handle(request: string): string {
    console.log("RoleMiddleware: Checking role");
    return super.handle(request); // Завжди передає далі
  }
}
```

**Особливості:**
- **Послідовна обробка**: Кожен middleware виконує свою логіку (лог, перевірка)
- **Передача**: Завжди передає запит далі через super.handle()
- **Спеціалізація**: Кожен middleware для конкретної перевірки
- **Логування**: Демонструє виконання перевірок

#### 3. Client Code
```typescript
function clientCode(middleware: Middleware) {
  const authMiddleware = new AuthMiddleware();
  const roleMiddleware = new RoleMiddleware();

  authMiddleware.setNext(roleMiddleware);

  authMiddleware.handle("request");
}
```

**Особливості:**
- **Створення ланцюжка**: Створює та налаштовує ланцюжок middleware
- **Послідовність**: AuthMiddleware → RoleMiddleware
- **Виконання**: Викликає handle() на першому middleware
- **Результат**: Всі middleware виконуються послідовно

### Особливості реалізації

**Переваги цього прикладу:**
- ✅ Простий та зрозумілий код
- ✅ Демонструє класичний middleware-патерн
- ✅ Легко додавати нові middleware
- ✅ Практичний приклад для веб-розробки

**Можливі покращення:**
- Можна додати умовну передачу (якщо auth не пройшов, не передавати далі)
- Можна додати обробку помилок
- Можна додати типізацію для request/response
- Можна додати можливість зупинки ланцюжка

## Типи Chain of Responsibility патернів

### 1. Simple Chain (Простий ланцюжок)
- Лінійний ланцюжок обробників
- Проста передача запитів
- Найпростіший варіант

### 2. Tree Chain (Деревоподібний ланцюжок)
- Розгалужений ланцюжок
- Складніша структура
- Більше гнучкості

### 3. Priority Chain (Ланцюжок з пріоритетами)
- Обробники з пріоритетами
- Сортування за пріоритетом
- Контрольована обробка

## Приклади використання

### 1. Middleware в Express.js
```typescript
// Express.js використовує Chain of Responsibility для middleware
app.use(authMiddleware);
app.use(roleMiddleware);
app.use(validationMiddleware);
app.use(handler);
```

### 2. Валідація з умовною передачею
```typescript
class EmailValidator extends Middleware {
  handle(data: string): string {
    if (!this.isEmail(data)) {
      throw new Error('Invalid email');
    }
    return super.handle(data);
  }
}

class PhoneValidator extends Middleware {
  handle(data: string): string {
    if (!this.isPhone(data)) {
      throw new Error('Invalid phone');
    }
    return super.handle(data);
  }
}
```

### 3. Авторизація з зупинкою ланцюжка
```typescript
class AuthMiddleware extends Middleware {
  handle(request: string): string {
    if (!this.isAuthenticated(request)) {
      throw new Error('Unauthorized'); // Зупиняє ланцюжок
    }
    return super.handle(request);
  }
}

class RoleMiddleware extends Middleware {
  handle(request: string): string {
    if (!this.hasPermission(request)) {
      throw new Error('No permission'); // Зупиняє ланцюжок
    }
    return super.handle(request);
  }
}
```

### 4. Логування та моніторинг
```typescript
class LoggingMiddleware extends Middleware {
  handle(request: string): string {
    console.log(`Request: ${request} at ${new Date()}`);
    const result = super.handle(request);
    console.log(`Response: ${result}`);
    return result;
  }
}
```

## Розширення функціональності

### Додавання умовної передачі (зупинка ланцюжка)
```typescript
class AuthMiddleware extends Middleware {
  handle(request: string): string {
    if (!this.isAuthenticated(request)) {
      throw new Error('Unauthorized'); // Зупиняє ланцюжок
    }
    return super.handle(request);
  }
}
```

### Додавання обробки помилок
```typescript
class ErrorHandlingMiddleware extends Middleware {
  handle(request: string): string {
    try {
      return super.handle(request);
    } catch (error) {
      console.error('Error in chain:', error);
      throw error;
    }
  }
}
```

### Додавання логування
```typescript
class LoggingMiddleware extends Middleware {
  handle(request: string): string {
    console.log(`${this.constructor.name} received: ${request}`);
    const result = super.handle(request);
    console.log(`${this.constructor.name} completed`);
    return result;
  }
}
```

### Додавання таймінгу
```typescript
class TimingMiddleware extends Middleware {
  handle(request: string): string {
    const start = Date.now();
    const result = super.handle(request);
    const duration = Date.now() - start;
    console.log(`Request took ${duration}ms`);
    return result;
  }
}
```

## Порівняння з іншими патернами

### Chain of Responsibility vs Decorator
- **Chain**: Запит передається по ланцюжку
- **Decorator**: Об'єкт обгортається в декоратори

### Chain of Responsibility vs Composite
- **Chain**: Лінійна структура обробників
- **Composite**: Деревоподібна структура

### Chain of Responsibility vs Strategy
- **Chain**: Обробка запиту по ланцюжку
- **Strategy**: Вибір алгоритму виконання

## Альтернативи

1. **if/switch statements** - для простих випадків
2. **Middleware патерн** - для обробки запитів (Express.js, Koa.js)
3. **Pipeline** - для послідовної обробки
4. **Event Bus** - для подійної обробки
5. **Decorator патерн** - для додавання функціональності до об'єктів

## Реальні застосування

### Express.js Middleware
```javascript
app.use(express.json());
app.use(authMiddleware);
app.use(roleMiddleware);
app.get('/api/data', handler);
```

### Koa.js Middleware
```javascript
app.use(authMiddleware);
app.use(roleMiddleware);
app.use(validationMiddleware);
```

### NestJS Interceptors
```typescript
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@Controller('users')
export class UsersController {}
```

## Висновок

Chain of Responsibility - це потужний патерн для обробки запитів по ланцюжку обробників. Він особливо корисний для систем з динамічною обробкою запитів та розділенням відповідальностей. Це один з найпоширеніших патернів у веб-розробці, який використовується в Express.js, Koa.js, NestJS та інших фреймворках для створення middleware-ланцюжків. Однак може ускладнити відстеження потоку обробки та призвести до неочікуваної поведінки, якщо не контролювати зупинку ланцюжка.
