# Патерн Strategy (Стратегія)

Ховає логіку алгоритму чи обрахування в окремий клас

## Опис

Strategy - це патерн поведінки, який визначає сімейство алгоритмів, інкапсулює кожен з них і робить їх взаємозамінними. Strategy дозволяє змінювати алгоритм незалежно від клієнтів, які його використовують.

## Основні принципи

- **Інкапсуляція алгоритмів**: Кожен алгоритм в окремому класі
- **Взаємозамінність**: Стратегії можна змінювати під час виконання
- **Розділення**: Контекст не знає про деталі реалізації
- **Поліморфізм**: Всі стратегії мають однаковий інтерфейс
- **Гнучкість**: Легко додавати нові стратегії

## Переваги

- ✅ Інкапсулює алгоритми в окремі класи
- ✅ Дозволяє змінювати алгоритм під час виконання
- ✅ Уникає великих if/switch конструкцій
- ✅ Легко додавати нові стратегії
- ✅ Підтримує принцип відкритості/закритості
- ✅ Покращує тестованість

## Недоліки

- ❌ Може призвести до великої кількості класів
- ❌ Клієнти повинні знати про різні стратегії
- ❌ Може бути надмірним для простих алгоритмів
- ❌ Потенційні проблеми з продуктивністю
- ❌ Складність у розумінні

## Коли використовувати

- Коли є кілька способів виконання однієї задачі
- Коли хочете уникнути великих if/switch конструкцій
- Коли потрібна гнучкість у виборі алгоритму
- Коли хочете інкапсулювати алгоритми
- Коли потрібно змінювати алгоритм під час виконання

## Структура патерну

### Компоненти

1. **Strategy** - інтерфейс стратегії
2. **ConcreteStrategy** - конкретні стратегії
3. **Context** - контекст (використовує стратегію)
4. **Client** - клієнт

## Реалізація (base.ts)

### Аналіз коду

#### 1. Strategy інтерфейс
```typescript
interface Strategy {
  execute(): void;
}
```

**Особливості:**
- **Інтерфейс**: Визначає контракт для всіх стратегій
- **Метод**: `execute()` виконує алгоритм
- **Універсальність**: Використовується для всіх типів стратегій

#### 2. Concrete Strategies
```typescript
class Strategy1 implements Strategy {
  public execute(): void {
    console.log("`execute` method of Strategy1 is being called");
  }
}

class Strategy2 implements Strategy {
  public execute(): void {
    console.log("`execute` method of Strategy2 is being called");
  }
}
```

**Особливості:**
- **Реалізація**: Кожна стратегія має свою реалізацію
- **Різні алгоритми**: Різні способи виконання задачі
- **Взаємозамінність**: Можна замінювати одну на іншу

#### 3. Context
```typescript
class Context {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.setStrategy(strategy);
  }

  public executeStrategy(): void {
    this.strategy.execute();
  }

  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }
}
```

**Особливості:**
- **Композиція**: Містить посилання на стратегію
- **Делегування**: Делегує виконання стратегії
- **Зміна**: Може змінювати стратегію під час виконання
- **Незалежність**: Не знає про деталі реалізації

#### 4. Використання
```typescript
const context: Context = new Context(new Strategy1());
context.executeStrategy();

context.setStrategy(new Strategy2());
context.executeStrategy();
```

**Особливості:**
- **Вибір стратегії**: Вибирається при створенні або пізніше
- **Зміна**: Можна змінювати стратегію під час виконання
- **Прозорість**: Клієнт викликає той самий метод

## Типи Strategy патернів

### 1. Simple Strategy (Проста стратегія)
- Базові алгоритми
- Мінімальна логіка
- Найпростіший варіант

### 2. Parameterized Strategy (Параметризована стратегія)
- Стратегія з параметрами
- Більше гнучкості
- Складніша реалізація

### 3. Strategy with Context (Стратегія з контекстом)
- Стратегія має доступ до контексту
- Більше інформації
- Складніша взаємодія

## Приклади використання

### 1. Сортування
```typescript
interface SortStrategy {
  sort(data: number[]): number[];
}

class QuickSort implements SortStrategy {
  sort(data: number[]): number[] {
    // Quick sort implementation
    return data.sort();
  }
}

class BubbleSort implements SortStrategy {
  sort(data: number[]): number[] {
    // Bubble sort implementation
    return data;
  }
}

class Sorter {
  constructor(private strategy: SortStrategy) {}

  sort(data: number[]): number[] {
    return this.strategy.sort(data);
  }
}
```

### 2. Оплата
```typescript
interface PaymentStrategy {
  pay(amount: number): void;
}

class CreditCardPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ${amount} with credit card`);
  }
}

class PayPalPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ${amount} with PayPal`);
  }
}

class PaymentProcessor {
  constructor(private strategy: PaymentStrategy) {}

  processPayment(amount: number): void {
    this.strategy.pay(amount);
  }
}
```

### 3. Валідація
```typescript
interface ValidationStrategy {
  validate(data: string): boolean;
}

class EmailValidation implements ValidationStrategy {
  validate(data: string): boolean {
    return data.includes('@');
  }
}

class PhoneValidation implements ValidationStrategy {
  validate(data: string): boolean {
    return /^\d+$/.test(data);
  }
}
```

## Розширення функціональності

### Додавання параметрів
```typescript
interface Strategy {
  execute(params: any): void;
}

class Strategy1 implements Strategy {
  execute(params: any): void {
    console.log('Executing with params:', params);
  }
}
```

### Додавання результатів
```typescript
interface Strategy {
  execute(): string;
}

class Strategy1 implements Strategy {
  execute(): string {
    return 'Result from Strategy1';
  }
}
```

### Додавання валідації
```typescript
class Context {
  setStrategy(strategy: Strategy): void {
    if (this.isValidStrategy(strategy)) {
      this.strategy = strategy;
    }
  }

  private isValidStrategy(strategy: Strategy): boolean {
    // Валідація стратегії
    return true;
  }
}
```

## Порівняння з іншими патернами

### Strategy vs State
- **Strategy**: Змінює алгоритм виконання
- **State**: Змінює поведінку залежно від стану

### Strategy vs Template Method
- **Strategy**: Використовує композицію
- **Template Method**: Використовує наслідування

### Strategy vs Command
- **Strategy**: Змінює алгоритм
- **Command**: Інкапсулює запит як об'єкт

## Альтернативи

1. **if/switch statements** - для простих випадків
2. **Function parameters** - для простих алгоритмів
3. **Template Method** - для схожих алгоритмів
4. **Polymorphism** - для базових випадків

## Висновок

Strategy - це потужний патерн для інкапсуляції алгоритмів та забезпечення їх взаємозамінності. Він особливо корисний для систем з багатьма способами виконання однієї задачі, але може бути надмірним для простих випадків з невеликою кількістю алгоритмів.
