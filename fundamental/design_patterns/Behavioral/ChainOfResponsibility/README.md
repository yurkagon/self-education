# Патерн Chain of Responsibility (Ланцюжок відповідальності)

Тварини (Monkey, Squirrel, Dog) обробляють різні продукти (Banana, Nut, MeatBall) по ланцюжку

## Опис

Chain of Responsibility - це патерн поведінки, який дозволяє передавати запити по ланцюжку обробників. Кожен обробник вирішує, чи обробити запит, чи передати його наступному обробнику в ланцюжку.

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

- Коли потрібно обробляти запити різними способами
- Коли хочете уникнути жорсткого зв'язування
- Коли потрібна гнучкість у обробці запитів
- Коли хочете розділити відповідальності
- Коли потрібна динамічна зміна обробників

## Структура патерну

### Компоненти

1. **Handler** - інтерфейс обробника
2. **AbstractHandler** - базовий клас обробника
3. **ConcreteHandler** - конкретні обробники (MonkeyHandler, SquirrelHandler, DogHandler)
4. **Client** - клієнт (відправляє запити через clientCode)

## Реалізація (base.ts)

### Аналіз коду

#### 1. Handler інтерфейс
```typescript
interface Handler<Request = string, Result = string> {
  setNext(handler: Handler<Request, Result>): Handler<Request, Result>;
  handle(request: Request): Result;
}
```

**Особливості:**
- **Generic типи**: Підтримує різні типи запитів та результатів
- **setNext()**: Встановлює наступний обробник в ланцюжку, повертає handler для ланцюжкового виклику
- **handle()**: Обробляє запит та повертає результат (або null, якщо не оброблено)
- **Ланцюжок**: Підтримує ланцюжок обробників

#### 2. AbstractHandler (Базовий обробник)
```typescript
abstract class AbstractHandler implements Handler {
  private nextHandler: Handler;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler; // Дозволяє ланцюжкове викликання: monkey.setNext(squirrel).setNext(dog)
  }

  public handle(request: string): string {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null; // Якщо немає наступного обробника
  }
}
```

**Особливості:**
- **Зберігання**: Зберігає посилання на наступний обробник
- **Передача**: Передає запит наступному обробнику, якщо він є
- **Базовий клас**: Надає загальну логіку для всіх обробників
- **Ланцюжкове викликання**: setNext() повертає handler для зручності

#### 3. Concrete Handlers
```typescript
class MonkeyHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === "Banana") {
      return `Monkey: I'll eat the ${request}.`;
    }
    return super.handle(request); // Передає далі, якщо не може обробити
  }
}

class SquirrelHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === "Nut") {
      return `Squirrel: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

class DogHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === "MeatBall") {
      return `Dog: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}
```

**Особливості:**
- **Умова**: Кожен обробник перевіряє, чи може обробити запит (Banana, Nut, MeatBall)
- **Обробка**: Якщо може - обробляє та повертає результат
- **Передача**: Якщо не може - передає далі через super.handle()
- **Спеціалізація**: Кожен обробник для конкретного типу запиту

#### 4. Client Code
```typescript
function clientCode(handler: Handler) {
  const foods = ["Nut", "Banana", "Cup of coffee"];

  for (const food of foods) {
    console.log(`Client: Who wants a ${food}?`);

    const result = handler.handle(food);
    if (result) {
      console.log(`  ${result}`);
    } else {
      console.log(`  ${food} was left untouched.`);
    }
  }
}
```

**Особливості:**
- **Тестування**: Тестує ланцюжок з різними запитами
- **Результат**: Перевіряє результат обробки
- **Обробка**: Виводить повідомлення про обробку або відсутність обробника

#### 5. Використання
```typescript
const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();

// Ланцюжкове викликання setNext()
monkey.setNext(squirrel).setNext(dog);

// Повний ланцюжок: Monkey > Squirrel > Dog
clientCode(monkey);

// Підланцюжок: Squirrel > Dog
clientCode(squirrel);
```

**Особливості:**
- **Ланцюжок**: Створюється ланцюжок обробників через ланцюжкове викликання
- **Гнучкість**: Можна використовувати будь-який обробник як початок ланцюжка
- **Підланцюжки**: Можна створювати підланцюжки з будь-якого обробника
- **Обробка**: Запит передається по ланцюжку до першого обробника, що може його обробити

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

### 1. Обробка помилок
```typescript
class ErrorHandler extends BaseHandler {
  handle(error: Error): void {
    if (error.type === 'validation') {
      console.log('Validation error handled');
    } else {
      super.handle(error);
    }
  }
}

class LoggingHandler extends BaseHandler {
  handle(error: Error): void {
    console.log('Logging error');
    super.handle(error);
  }
}
```

### 2. Валідація
```typescript
class EmailValidator extends BaseHandler {
  handle(data: string): void {
    if (this.isEmail(data)) {
      console.log('Email validated');
    } else {
      super.handle(data);
    }
  }
}

class PhoneValidator extends BaseHandler {
  handle(data: string): void {
    if (this.isPhone(data)) {
      console.log('Phone validated');
    } else {
      super.handle(data);
    }
  }
}
```

### 3. Авторизація
```typescript
class AuthHandler extends BaseHandler {
  handle(request: Request): void {
    if (this.isAuthenticated(request)) {
      super.handle(request);
    } else {
      console.log('Unauthorized');
    }
  }
}

class PermissionHandler extends BaseHandler {
  handle(request: Request): void {
    if (this.hasPermission(request)) {
      super.handle(request);
    } else {
      console.log('No permission');
    }
  }
}
```

## Розширення функціональності

### Додавання обробки всіх обробників
```typescript
class BaseHandler {
  handle(request: string): void {
    this.process(request);
    if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }

  protected process(request: string): void {
    // Обробка в кожному обробнику
  }
}
```

### Додавання умовної передачі
```typescript
class BaseHandler {
  handle(request: string): void {
    if (this.canHandle(request)) {
      this.process(request);
    } else if (this.shouldPass(request)) {
      super.handle(request);
    }
  }

  protected shouldPass(request: string): boolean {
    return true;
  }
}
```

### Додавання логування
```typescript
class BaseHandler {
  handle(request: string): void {
    console.log(`${this.constructor.name} received: ${request}`);
    super.handle(request);
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
2. **Middleware** - для обробки запитів
3. **Pipeline** - для послідовної обробки
4. **Event Bus** - для подійної обробки

## Висновок

Chain of Responsibility - це потужний патерн для обробки запитів по ланцюжку обробників. Він особливо корисний для систем з динамічною обробкою запитів та розділенням відповідальностей, але може ускладнити відстеження потоку обробки та призвести до неочікуваної поведінки.
