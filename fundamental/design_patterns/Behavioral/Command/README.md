# Патерн Command (Команда)

Передаємо onClick як команду Button

## Опис

Command - це патерн поведінки, який інкапсулює запит як об'єкт, дозволяючи параметризувати клієнтів різними запитами, ставити запити в чергу, логувати запити та підтримувати скасування операцій.

## Основні принципи

- **Інкапсуляція**: Запит інкапсульований як об'єкт
- **Відокремлення**: Викликач не знає, як виконується запит
- **Гнучкість**: Можна параметризувати клієнтів різними командами
- **Черга**: Команди можна ставити в чергу та виконувати пізніше
- **Скасування**: Підтримує операцію undo/redo

## Переваги

- ✅ Інкапсулює запити як об'єкти
- ✅ Відокремлює об'єкт, що викликає, від об'єкта, що виконує
- ✅ Підтримує скасування операцій
- ✅ Можна ставити команди в чергу
- ✅ Легко додавати нові команди
- ✅ Логування та моніторинг

## Недоліки

- ❌ Додає складність до коду
- ❌ Велика кількість класів
- ❌ Може бути надмірним для простих випадків
- ❌ Потенційні проблеми з пам'яттю
- ❌ Складність у налагодженні

## Коли використовувати

- Коли потрібно параметризувати об'єкти операціями
- Коли хочете підтримувати скасування операцій
- Коли потрібно ставити запити в чергу
- Коли хочете логувати запити
- Коли потрібна гнучкість у виконанні команд

## Структура патерну

### Компоненти

1. **Command** - інтерфейс команди
2. **ConcreteCommand** - конкретна команда (виконує операцію)
3. **Invoker** - викликач (викликає команду)
4. **Client** - клієнт

**Примітка**: Receiver (отримувач) не обов'язковий для простих випадків. Команда може виконувати дію безпосередньо.

## Реалізація (base.ts)

### Аналіз коду

#### 1. Command інтерфейс
```typescript
interface Command {
  execute(): void;
}
```

**Особливості:**
- **Інтерфейс**: Визначає контракт для всіх команд
- **Метод**: `execute()` виконує команду
- **Універсальність**: Використовується для всіх типів команд

#### 2. Concrete Commands
```typescript
class SaveCommand implements Command {
  execute(): void {
    console.log('Saving...');
  }
}

class DeleteCommand implements Command {
  execute(): void {
    console.log('Deleting...');
  }
}
```

**Особливості:**
- **Інкапсуляція**: Інкапсулює запит як об'єкт
- **Пряме виконання**: Команда виконує дію безпосередньо
- **Спеціалізація**: Кожна команда для конкретної операції
- **Простота**: Не потребує Receiver для простих випадків

#### 3. Invoker (Button)
```typescript
class Button {
  constructor(private command: Command) {}

  onClick(): void {
    this.command.execute();
  }
}
```

**Особливості:**
- **Викликач**: Викликає команду при кліку
- **Незалежність**: Не знає, яка команда виконується
- **Гнучкість**: Може працювати з будь-якою командою
- **Простота**: Класичний приклад для UI кнопок

#### 4. Використання
```typescript
const saveButton = new Button(new SaveCommand());
const deleteButton = new Button(new DeleteCommand());

saveButton.onClick();
deleteButton.onClick();
```

**Особливості:**
- **Параметризація**: Кожна кнопка має свою команду
- **Відокремлення**: Кнопка не знає про деталі виконання
- **Гнучкість**: Легко створювати нові кнопки з різними командами
- **Простота**: Зрозумілий приклад для швидкого згадування

## Типи Command патернів

### 1. Simple Command (Проста команда)
- Одна операція
- Без параметрів
- Без скасування

### 2. Command with Parameters (Команда з параметрами)
- Команда з параметрами
- Гнучкість у виконанні
- Складніша логіка

### 3. Undoable Command (Команда зі скасуванням)
- Підтримує операцію undo
- Зберігає стан до виконання
- Можливість повернення

### 4. Macro Command (Макрокоманда)
- Набір команд
- Виконання кількох команд разом
- Складні операції

## Приклади використання

### 1. UI кнопки
```typescript
// Команди для кнопок
class SaveCommand implements Command {
  execute(): void {
    console.log('Saving...');
  }
}

class DeleteCommand implements Command {
  execute(): void {
    console.log('Deleting...');
  }
}

// Button (Invoker)
class Button {
  constructor(private command: Command) {}

  onClick(): void {
    this.command.execute();
  }
}

// Використання
const saveButton = new Button(new SaveCommand());
const deleteButton = new Button(new DeleteCommand());

saveButton.onClick();
deleteButton.onClick();
```

### 2. Скасування операцій
```typescript
// Команда зі скасуванням
class UndoableCommand implements Command {
  private previousState: any;

  execute(): void {
    this.previousState = this.saveState();
    this.performAction();
  }

  undo(): void {
    this.restoreState(this.previousState);
  }
}
```

### 3. Черга команд
```typescript
// Черга команд
class CommandQueue {
  private commands: Command[] = [];

  add(command: Command): void {
    this.commands.push(command);
  }

  executeAll(): void {
    while (this.commands.length > 0) {
      const command = this.commands.shift();
      command?.execute();
    }
  }
}
```

## Розширення функціональності

### Додавання логування
```typescript
class LoggingCommand implements Command {
  constructor(private command: Command) {}

  execute(): void {
    console.log('Executing command...');
    this.command.execute();
    console.log('Command executed');
  }
}
```

### Додавання валідації
```typescript
class ValidatingCommand implements Command {
  constructor(private command: Command) {}

  execute(): void {
    if (this.isValid()) {
      this.command.execute();
    } else {
      throw new Error('Command is not valid');
    }
  }
}
```

## Порівняння з іншими патернами

### Command vs Strategy
- **Command**: Інкапсулює запит як об'єкт
- **Strategy**: Змінює алгоритм виконання

### Command vs Observer
- **Command**: Один запит - одна відповідь
- **Observer**: Багато спостерігачів на одну подію

### Command vs State
- **Command**: Інкапсулює операцію
- **State**: Змінює поведінку об'єкта

## Альтернативи

1. **Function Reference** - для простих випадків
2. **Callback** - для асинхронних операцій
3. **Event Listener** - для подій
4. **Runnable Interface** - для потоків

## Висновок

Command - це потужний патерн для інкапсуляції запитів як об'єктів. Він особливо корисний для підтримки скасування операцій, черги команд та логування, але може додати складність до коду для простих випадків.
