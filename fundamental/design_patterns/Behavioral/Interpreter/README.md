# Патерн Interpreter (Інтерпретатор)

## Опис

Interpreter - це патерн поведінки, який визначає граматику для мови та інтерпретує речення цієї мови. Патерн використовується для реалізації мов програмування, запитів та інших доменних мов.

## Основні принципи

- **Граматика**: Визначає граматику мови
- **Інтерпретація**: Інтерпретує речення мови
- **Дерево виразів**: Використовує дерево виразів
- **Рекурсія**: Використовує рекурсивну обробку
- **Розширюваність**: Легко додавати нові вирази

## Переваги

- ✅ Легко додавати нові вирази
- ✅ Проста реалізація граматики
- ✅ Інкапсулює правила інтерпретації
- ✅ Підтримує принцип відкритості/закритості
- ✅ Гнучкість у розширенні

## Недоліки

- ❌ Може призвести до великої кількості класів
- ❌ Складність у розумінні
- ❌ Може зменшити продуктивність
- ❌ Потенційні проблеми з продуктивністю
- ❌ Складність у налагодженні

## Коли використовувати

- Коли потрібно інтерпретувати мову
- Коли граматика проста та стабільна
- Коли потрібна гнучкість у розширенні
- Коли хочете інкапсулювати правила інтерпретації
- Коли потрібна реалізація доменної мови

## Структура патерну

### Компоненти

1. **AbstractExpression** - абстрактний вираз
2. **TerminalExpression** - термінальний вираз
3. **NonTerminalExpression** - нетермінальний вираз
4. **Context** - контекст інтерпретації
5. **Client** - клієнт

## Реалізація (base.ts)

### Аналіз коду

#### 1. Expression інтерфейс
```typescript
interface Expression {
  interpret(): number;
}
```

**Особливості:**
- **Інтерфейс**: Визначає контракт для всіх виразів
- **interpret()**: Інтерпретує вираз та повертає результат
- **Універсальність**: Використовується для всіх типів виразів

#### 2. Terminal Expression
```typescript
class NumberExpression implements Expression {
  constructor(private value: number) {}

  interpret(): number {
    return this.value;
  }
}
```

**Особливості:**
- **Термінальний**: Представляє термінальний символ
- **Значення**: Зберігає значення
- **Повернення**: Повертає значення без обробки

#### 3. Non-Terminal Expression
```typescript
class AddExpression implements Expression {
  constructor(
    private left: Expression,
    private right: Expression
  ) {}

  interpret(): number {
    return this.left.interpret() + this.right.interpret();
  }
}
```

**Особливості:**
- **Нетермінальний**: Представляє нетермінальний символ
- **Композиція**: Містить інші вирази
- **Рекурсія**: Рекурсивно інтерпретує підвирази
- **Операція**: Виконує операцію над результатами

#### 4. Використання
```typescript
const expression = new AddExpression(
  new NumberExpression(5),
  new NumberExpression(3)
);

console.log(expression.interpret()); // 8
```

**Особливості:**
- **Дерево**: Створює дерево виразів
- **Інтерпретація**: Інтерпретує дерево знизу вгору
- **Результат**: Повертає результат обчислення

## Типи Interpreter патернів

### 1. Simple Interpreter (Простий інтерпретатор)
- Базові вирази
- Мінімальна граматика
- Найпростіший варіант

### 2. Context-based Interpreter (Контекстний інтерпретатор)
- Використовує контекст
- Змінні та середовище
- Складніша реалізація

### 3. Grammar-based Interpreter (Граматичний інтерпретатор)
- Повна граматика
- Парсинг та інтерпретація
- Складніша архітектура

## Приклади використання

### 1. Калькулятор
```typescript
class SubtractExpression implements Expression {
  constructor(
    private left: Expression,
    private right: Expression
  ) {}

  interpret(): number {
    return this.left.interpret() - this.right.interpret();
  }
}

class MultiplyExpression implements Expression {
  constructor(
    private left: Expression,
    private right: Expression
  ) {}

  interpret(): number {
    return this.left.interpret() * this.right.interpret();
  }
}
```

### 2. SQL запити
```typescript
class SelectExpression implements Expression {
  interpret(): QueryResult {
    // Інтерпретація SELECT запиту
  }
}

class WhereExpression implements Expression {
  interpret(): QueryResult {
    // Інтерпретація WHERE умови
  }
}
```

### 3. Регулярні вирази
```typescript
class RegexExpression implements Expression {
  interpret(): MatchResult {
    // Інтерпретація регулярного виразу
  }
}
```

## Розширення функціональності

### Додавання контексту
```typescript
class Context {
  private variables: Record<string, number> = {};

  setVariable(name: string, value: number): void {
    this.variables[name] = value;
  }

  getVariable(name: string): number {
    return this.variables[name];
  }
}

class VariableExpression implements Expression {
  constructor(
    private name: string,
    private context: Context
  ) {}

  interpret(): number {
    return this.context.getVariable(this.name);
  }
}
```

### Додавання складних операцій
```typescript
class PowerExpression implements Expression {
  constructor(
    private base: Expression,
    private exponent: Expression
  ) {}

  interpret(): number {
    return Math.pow(this.base.interpret(), this.exponent.interpret());
  }
}
```

### Додавання валідації
```typescript
class Expression {
  interpret(): number {
    this.validate();
    return this.calculate();
  }

  protected validate(): void {
    // Валідація виразу
  }

  protected abstract calculate(): number;
}
```

## Порівняння з іншими патернами

### Interpreter vs Composite
- **Interpreter**: Інтерпретує вирази
- **Composite**: Структура об'єктів

### Interpreter vs Visitor
- **Interpreter**: Інтерпретує мову
- **Visitor**: Додає операції до об'єктів

### Interpreter vs Strategy
- **Interpreter**: Інтерпретує граматику
- **Strategy**: Вибір алгоритму

## Альтернативи

1. **Parser Libraries** - для складних граматик
2. **AST (Abstract Syntax Tree)** - для складних мов
3. **Compiler** - для компіляції
4. **DSL (Domain Specific Language)** - для доменних мов

## Висновок

Interpreter - це потужний патерн для реалізації інтерпретації мов та граматик. Він особливо корисний для простих граматик та доменних мов, але може призвести до великої кількості класів та зменшити продуктивність для складних граматик.
