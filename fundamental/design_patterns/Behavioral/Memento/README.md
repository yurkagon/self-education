# Патерн Memento (Згадка)

## Опис

Memento - це патерн поведінки, який дозволяє зберігати та відновлювати попередній стан об'єкта без розкриття деталей його реалізації. Патерн забезпечує можливість відкату змін.

## Основні принципи

- **Збереження стану**: Зберігає стан об'єкта
- **Відновлення**: Відновлює попередній стан
- **Інкапсуляція**: Не розкриває деталі реалізації
- **Історія**: Підтримує історію станів
- **Undo/Redo**: Забезпечує функціональність скасування

## Переваги

- ✅ Зберігає стан об'єкта без розкриття деталей
- ✅ Підтримує функціональність undo/redo
- ✅ Дозволяє відновлювати попередні стани
- ✅ Інкапсулює збереження стану
- ✅ Підтримує історію змін

## Недоліки

- ❌ Може вимагати багато пам'яті
- ❌ Складність у управлінні історією
- ❌ Може зменшити продуктивність
- ❌ Потенційні проблеми з пам'яттю
- ❌ Складність у налагодженні

## Коли використовувати

- Коли потрібна функціональність undo/redo
- Коли хочете зберігати стан об'єкта
- Коли потрібна можливість відкату змін
- Коли хочете інкапсулювати збереження стану
- Коли потрібна історія змін

## Структура патерну

### Компоненти

1. **Originator** - об'єкт, стан якого зберігається
2. **Memento** - зберігає стан об'єкта
3. **Caretaker** - управляє згадками
4. **Client** - клієнт

## Реалізація (base.ts)

### Аналіз коду

#### 1. Memento
```typescript
class Memento {
  constructor(private state: string) {}

  getState(): string {
    return this.state;
  }
}
```

**Особливості:**
- **Збереження**: Зберігає стан об'єкта
- **Інкапсуляція**: Не розкриває деталі реалізації
- **Незмінність**: Стан не змінюється після створення

#### 2. Originator
```typescript
class Originator {
  private state: string = '';

  setState(state: string): void {
    this.state = state;
  }

  save(): Memento {
    return new Memento(this.state);
  }

  restore(memento: Memento): void {
    this.state = memento.getState();
  }
}
```

**Особливості:**
- **Стан**: Має внутрішній стан
- **save()**: Створює згадку з поточного стану
- **restore()**: Відновлює стан зі згадки
- **Контроль**: Контролює створення та відновлення

#### 3. Caretaker
```typescript
class Caretaker {
  private mementos: Memento[] = [];

  addMemento(memento: Memento): void {
    this.mementos.push(memento);
  }

  getMemento(index: number): Memento {
    return this.mementos[index];
  }
}
```

**Особливості:**
- **Зберігання**: Зберігає згадки в масиві
- **Управління**: Управляє історією станів
- **Доступ**: Надає доступ до згадок

#### 4. Використання
```typescript
const originator = new Originator();
const caretaker = new Caretaker();

originator.setState('State 1');
caretaker.addMemento(originator.save());

originator.setState('State 2');
originator.restore(caretaker.getMemento(0));
```

**Особливості:**
- **Збереження**: Зберігає стани в згадках
- **Відновлення**: Відновлює попередні стани
- **Історія**: Підтримує історію змін

## Типи Memento патернів

### 1. Simple Memento (Проста згадка)
- Базове збереження стану
- Мінімальна функціональність
- Найпростіший варіант

### 2. Incremental Memento (Інкрементальна згадка)
- Зберігає тільки зміни
- Економить пам'ять
- Складніша реалізація

### 3. Command-based Memento (Командна згадка)
- Комбінується з Command патерном
- Підтримує undo/redo
- Складніша архітектура

## Приклади використання

### 1. Текстовий редактор
```typescript
class TextEditor {
  private content: string = '';

  save(): Memento {
    return new Memento(this.content);
  }

  restore(memento: Memento): void {
    this.content = memento.getState();
  }
}
```

### 2. Гра
```typescript
class Game {
  private level: number = 1;
  private score: number = 0;

  save(): Memento {
    return new Memento(JSON.stringify({ level: this.level, score: this.score }));
  }

  restore(memento: Memento): void {
    const state = JSON.parse(memento.getState());
    this.level = state.level;
    this.score = state.score;
  }
}
```

### 3. Форма
```typescript
class Form {
  private fields: Record<string, string> = {};

  save(): Memento {
    return new Memento(JSON.stringify(this.fields));
  }

  restore(memento: Memento): void {
    this.fields = JSON.parse(memento.getState());
  }
}
```

## Розширення функціональності

### Додавання timestamp
```typescript
class Memento {
  constructor(
    private state: string,
    private timestamp: Date = new Date()
  ) {}

  getTimestamp(): Date {
    return this.timestamp;
  }
}
```

### Додавання обмеження історії
```typescript
class Caretaker {
  private maxHistory: number = 10;

  addMemento(memento: Memento): void {
    this.mementos.push(memento);
    if (this.mementos.length > this.maxHistory) {
      this.mementos.shift();
    }
  }
}
```

### Додавання метаданих
```typescript
class Memento {
  constructor(
    private state: string,
    private metadata: Record<string, any> = {}
  ) {}

  getMetadata(): Record<string, any> {
    return this.metadata;
  }
}
```

## Порівняння з іншими патернами

### Memento vs Command
- **Memento**: Зберігає стан об'єкта
- **Command**: Інкапсулює операцію

### Memento vs Prototype
- **Memento**: Зберігає стан для відновлення
- **Prototype**: Клонує об'єкт

### Memento vs State
- **Memento**: Зберігає попередній стан
- **State**: Змінює поведінку залежно від стану

## Альтернативи

1. **Serialization** - для простих випадків
2. **Copy Constructor** - для копіювання стану
3. **State History** - для простих станів
4. **Command Pattern** - для undo/redo

## Висновок

Memento - це потужний патерн для збереження та відновлення стану об'єктів. Він особливо корисний для реалізації функціональності undo/redo та збереження історії змін, але може вимагати багато пам'яті та ускладнити управління історією.
