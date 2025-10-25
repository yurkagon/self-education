# Патерн Decorator (Декоратор)

## Опис

Decorator - це структурний патерн проектування, який дозволяє динамічно додавати нову функціональність до об'єктів, обгортаючи їх в об'єкти-декоратори. Патерн забезпечує гнучкий альтернативний спосіб розширення функціональності порівняно з наслідуванням.

## Основні принципи

- **Композиція**: Використовує композицію замість наслідування
- **Динамічність**: Додає функціональність під час виконання
- **Гнучкість**: Можна комбінувати різні декоратори
- **Прозорість**: Декоратор має той самий інтерфейс, що й оригінальний об'єкт
- **Ланцюжковість**: Можна обгортати об'єкт в кілька декораторів

## Переваги

- ✅ Гнучкість у додаванні функціональності
- ✅ Уникнення проблем з наслідуванням
- ✅ Можливість комбінування різних декораторів
- ✅ Дотримання принципу відкритості/закритості
- ✅ Динамічне додавання функціональності
- ✅ Легко тестувати окремі декоратори

## Недоліки

- ❌ Може призвести до складної ієрархії
- ❌ Складність у налагодженні
- ❌ Може ускладнити код
- ❌ Потенційні проблеми з продуктивністю
- ❌ Складність у розумінні порядку декораторів

## Коли використовувати

- Коли потрібно додавати функціональність динамічно
- Коли наслідування не підходить
- Коли хочете уникнути створення великої кількості підкласів
- Коли потрібна гнучкість у комбінуванні функціональності
- Коли хочете додавати функціональність без зміни існуючого коду

## Структура патерну

### Компоненти

1. **Component** - базовий інтерфейс або абстрактний клас
2. **ConcreteComponent** - конкретна реалізація компонента
3. **Decorator** - базовий декоратор
4. **ConcreteDecorator** - конкретні декоратори
5. **Client** - клієнт, який використовує декоратори

## Реалізація (base.ts)

### Аналіз коду

#### 1. Базовий компонент
```typescript
class Item {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
```

**Особливості:**
- **Простий клас**: Базовий об'єкт без додаткової функціональності
- **Властивість**: Тільки ім'я предмета
- **Конструктор**: Приймає ім'я при створенні

#### 2. Декоратор функція
```typescript
const withPrice = instance => {
  instance.price = 0;

  instance.setPrice = function(price) {
    this.price = price;
  }

  return instance;
}
```

**Особливості:**
- **Функціональний підхід**: Використовує функцію замість класу
- **Монkey patching**: Додає властивості та методи до існуючого об'єкта
- **Повернення**: Повертає модифікований об'єкт
- **Динамічність**: Додає функціональність під час виконання

#### 3. Використання
```typescript
const pen = new Item('pen');
const penWithPrice = withPrice(pen);
penWithPrice.setPrice(500);
```

**Особливості:**
- **Створення**: Спочатку створюється базовий об'єкт
- **Декорація**: Потім застосовується декоратор
- **Використання**: Декоратор додає нову функціональність

## Реалізація (typescript.ts)

### Аналіз коду

#### 1. Інтерфейс компонента
```typescript
interface Component {
  name?: string;
  operation(): string;
}
```

**Особливості:**
- **Інтерфейс**: Визначає контракт для всіх компонентів
- **Опціональні властивості**: `name` може бути або не бути
- **Метод**: `operation()` повертає рядок

#### 2. Конкретний компонент
```typescript
class SomeComponent implements Component {
  public name = 'some component';

  public operation() {
    return this.name;
  }
}
```

**Особливості:**
- **Реалізація**: Конкретна реалізація інтерфейсу
- **Властивість**: Має ім'я компонента
- **Метод**: Повертає ім'я компонента

#### 3. Декоратор
```typescript
class ComponentDecorator implements Component {
  private component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  public operation() {
    const str = this.component.operation();
    console.log(str);
    return str;
  }
}
```

**Особливості:**
- **Композиція**: Містить посилання на компонент
- **Делегування**: Викликає метод компонента
- **Розширення**: Додає логування до операції
- **Прозорість**: Має той самий інтерфейс

## Типи Decorator патернів

### 1. Function Decorator (Функціональний декоратор)
- Використовує функції замість класів
- Простіший у реалізації
- Менш типобезпечний

### 2. Class Decorator (Класовий декоратор)
- Використовує класи та інтерфейси
- Більш типобезпечний
- Складніший у реалізації

### 3. Method Decorator (Методний декоратор)
- Декоратує окремі методи
- Використовується в TypeScript
- Спеціальний синтаксис

## Приклади використання

### 1. Текстове форматування
```typescript
interface TextComponent {
  getText(): string;
}

class PlainText implements TextComponent {
  constructor(private text: string) {}
  
  getText(): string {
    return this.text;
  }
}

class BoldDecorator implements TextComponent {
  constructor(private component: TextComponent) {}
  
  getText(): string {
    return `<b>${this.component.getText()}</b>`;
  }
}

class ItalicDecorator implements TextComponent {
  constructor(private component: TextComponent) {}
  
  getText(): string {
    return `<i>${this.component.getText()}</i>`;
  }
}
```

### 2. Логування та кешування
```typescript
class LoggingDecorator implements Component {
  constructor(private component: Component) {}
  
  operation(): string {
    console.log('Before operation');
    const result = this.component.operation();
    console.log('After operation');
    return result;
  }
}

class CachingDecorator implements Component {
  private cache: string | null = null;
  
  constructor(private component: Component) {}
  
  operation(): string {
    if (this.cache === null) {
      this.cache = this.component.operation();
    }
    return this.cache;
  }
}
```

### 3. Валідація та безпека
```typescript
class ValidationDecorator implements Component {
  constructor(private component: Component) {}
  
  operation(): string {
    const result = this.component.operation();
    if (!this.isValid(result)) {
      throw new Error('Invalid result');
    }
    return result;
  }
  
  private isValid(result: string): boolean {
    return result.length > 0;
  }
}
```

## Розширення функціональності

### Додавання параметрів до декоратора
```typescript
class ConfigurableDecorator implements Component {
  constructor(
    private component: Component,
    private config: { prefix?: string; suffix?: string }
  ) {}
  
  operation(): string {
    const result = this.component.operation();
    return `${this.config.prefix || ''}${result}${this.config.suffix || ''}`;
  }
}
```

### Додавання стану до декоратора
```typescript
class StatefulDecorator implements Component {
  private callCount: number = 0;
  
  constructor(private component: Component) {}
  
  operation(): string {
    this.callCount++;
    const result = this.component.operation();
    return `${result} (called ${this.callCount} times)`;
  }
}
```

### Додавання умовної логіки
```typescript
class ConditionalDecorator implements Component {
  constructor(
    private component: Component,
    private condition: () => boolean
  ) {}
  
  operation(): string {
    if (this.condition()) {
      return this.component.operation();
    }
    return 'Operation skipped';
  }
}
```

## Порівняння з іншими патернами

### Decorator vs Adapter
- **Decorator**: Додає функціональність, зберігає інтерфейс
- **Adapter**: Змінює інтерфейс, не додає функціональність

### Decorator vs Facade
- **Decorator**: Додає функціональність до одного об'єкта
- **Facade**: Спрощує інтерфейс до групи об'єктів

### Decorator vs Proxy
- **Decorator**: Додає функціональність
- **Proxy**: Контролює доступ до об'єкта

## Антипатерни

### 1. God Decorator (Божественний декоратор)
```typescript
// Погано - занадто багато відповідальностей
class GodDecorator {
  public operation(): string {
    // Логування, кешування, валідація, безпека, тощо
  }
}
```

### 2. Decorator Hell (Пекло декораторів)
```typescript
// Погано - занадто багато вкладених декораторів
const result = new Decorator1(
  new Decorator2(
    new Decorator3(
      new Decorator4(component)
    )
  )
);
```

## Альтернативи

1. **Inheritance** - для статичного розширення
2. **Composition** - для простого об'єднання функціональності
3. **Strategy Pattern** - для зміни алгоритмів
4. **Chain of Responsibility** - для послідовної обробки

## Висновок

Decorator - це потужний патерн для динамічного додавання функціональності до об'єктів. Він особливо корисний коли потрібна гнучкість у комбінуванні різних функціональностей або коли наслідування не підходить. Патерн забезпечує чистий спосіб розширення функціональності, але потребує обережного проектування, щоб не створити складну ієрархію декораторів.
