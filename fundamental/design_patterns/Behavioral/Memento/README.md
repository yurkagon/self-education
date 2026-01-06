# Патерн Memento (Згадка)

Текстовий редактор з можливістю undo (відкату змін)

## Опис

Memento - це патерн поведінки, який дозволяє зберігати та відновлювати попередній стан об'єкта без розкриття деталей його реалізації. Патерн забезпечує можливість відкату змін. Класичний приклад - текстовий редактор з функцією undo.

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

1. **Originator (TextEditor)** - об'єкт, стан якого зберігається
2. **Memento** - зберігає стан об'єкта (текст)
3. **Caretaker (History)** - управляє згадками та історією
4. **Client** - клієнт (використовує редактор)

## Реалізація (base.ts)

### Аналіз коду

#### 1. Memento (Згадка)
```typescript
class Memento {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  getText(): string {
    return this.text;
  }
}
```

**Особливості:**
- **Збереження**: Зберігає текст (стан об'єкта)
- **Інкапсуляція**: Не розкриває деталі реалізації
- **Незмінність**: Текст не змінюється після створення
- **Простота**: Мінімальний інтерфейс для отримання стану

#### 2. History (Caretaker - Опікун)
```typescript
class History {
  private history: Memento[] = [];

  save(memento: Memento): void {
    this.history.push(memento);
  }

  undo(): Memento | null {
    return this.history.pop() || null;
  }
}
```

**Особливості:**
- **Зберігання**: Зберігає згадки в масиві (стек)
- **Управління**: Управляє історією станів
- **Undo**: Метод `undo()` повертає останній збережений стан
- **Стек**: Використовує стек для LIFO (Last In, First Out)

#### 3. TextEditor (Originator - Творець)
```typescript
class TextEditor {
  private text: string = '';

  setText(text: string): void {
    this.text = text;
  }

  getText(): string {
    return this.text;
  }

  save(): Memento {
    return new Memento(this.text);
  }

  restore(memento: Memento): void {
    this.text = memento.getText();
  }
}
```

**Особливості:**
- **Стан**: Має внутрішній стан (текст)
- **save()**: Створює згадку з поточного стану
- **restore()**: Відновлює стан зі згадки
- **Контроль**: Контролює створення та відновлення стану

#### 4. Використання
```typescript
const editor = new TextEditor();
const history = new History();

// Пишемо текст
editor.setText('Привіт');
history.save(editor.save());

editor.setText('Привіт, світ!');
history.save(editor.save());

editor.setText('Привіт, світ! Я тут.');

// Відкат (undo)
const previous = history.undo();
if (previous) {
  editor.restore(previous);
}

console.log(editor.getText()); // "Привіт, світ!"
```

**Особливості:**
- **Збереження**: Зберігає стани в історії після кожної зміни
- **Відновлення**: Відновлює попередній стан через `undo()`
- **Історія**: Підтримує історію змін у вигляді стеку
- **Undo**: Простий механізм відкату останньої зміни

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

### 1. Текстовий редактор (base.ts)
Це основний приклад у файлі `base.ts` - простий текстовий редактор з функцією undo.

### 2. Розширений редактор з redo
```typescript
class AdvancedHistory {
  private history: Memento[] = [];
  private currentIndex: number = -1;

  save(memento: Memento): void {
    // Видаляємо все після поточного індексу
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push(memento);
    this.currentIndex++;
  }

  undo(): Memento | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return null;
  }

  redo(): Memento | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return null;
  }
}
```

### 3. Гра (збереження прогресу)
```typescript
class Game {
  private level: number = 1;
  private score: number = 0;

  save(): Memento {
    return new Memento(JSON.stringify({ level: this.level, score: this.score }));
  }

  restore(memento: Memento): void {
    const state = JSON.parse(memento.getText());
    this.level = state.level;
    this.score = state.score;
  }
}
```

### 4. Форма (відкат змін)
```typescript
class Form {
  private fields: Record<string, string> = {};

  save(): Memento {
    return new Memento(JSON.stringify(this.fields));
  }

  restore(memento: Memento): void {
    this.fields = JSON.parse(memento.getText());
  }
}
```

## Розширення функціональності

### Додавання обмеження історії
```typescript
class History {
  private history: Memento[] = [];
  private maxHistory: number = 10;

  save(memento: Memento): void {
    this.history.push(memento);
    if (this.history.length > this.maxHistory) {
      this.history.shift(); // Видаляємо найстаріший
    }
  }
}
```

### Додавання timestamp
```typescript
class Memento {
  constructor(
    private text: string,
    private timestamp: Date = new Date()
  ) {}

  getText(): string {
    return this.text;
  }

  getTimestamp(): Date {
    return this.timestamp;
  }
}
```

### Додавання redo (повернення вперед)
```typescript
class History {
  private history: Memento[] = [];
  private currentIndex: number = -1;

  save(memento: Memento): void {
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push(memento);
    this.currentIndex++;
  }

  undo(): Memento | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return null;
  }

  redo(): Memento | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return null;
  }
}
```

### Додавання метаданих
```typescript
class Memento {
  constructor(
    private text: string,
    private metadata: Record<string, any> = {}
  ) {}

  getText(): string {
    return this.text;
  }

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
