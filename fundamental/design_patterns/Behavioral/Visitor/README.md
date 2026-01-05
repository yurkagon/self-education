# Патерн Visitor (Відвідувач)

## Опис

Visitor - це патерн поведінки, який дозволяє додавати нові операції до об'єктів без зміни їх класів. Патерн відокремлює алгоритми від об'єктів, на яких вони працюють.

## Основні принципи

- **Відокремлення**: Алгоритми відокремлені від об'єктів
- **Додавання операцій**: Легко додавати нові операції
- **Подвійна диспетчеризація**: Використовує подвійну диспетчеризацію
- **Гнучкість**: Легко додавати нових відвідувачів
- **Розширюваність**: Підтримує принцип відкритості/закритості

## Переваги

- ✅ Дозволяє додавати операції без зміни класів
- ✅ Групує пов'язані операції в одному місці
- ✅ Легко додавати нових відвідувачів
- ✅ Підтримує принцип відкритості/закритості
- ✅ Розширюваність

## Недоліки

- ❌ Складність у розумінні
- ❌ Може ускладнити додавання нових елементів
- ❌ Потенційні проблеми з продуктивністю
- ❌ Складність у налагодженні
- ❌ Може призвести до великої кількості класів

## Коли використовувати

- Коли потрібно додавати операції до об'єктів без зміни класів
- Коли структура об'єктів стабільна, але операції часто змінюються
- Коли хочете групувати пов'язані операції
- Коли потрібна гнучкість у додаванні операцій

## Структура патерну

### Компоненти

1. **Element** - інтерфейс елемента
2. **ConcreteElement** - конкретні елементи
3. **Visitor** - інтерфейс відвідувача
4. **ConcreteVisitor** - конкретні відвідувачі
5. **Client** - клієнт

## Реалізація (base.ts)

### Аналіз коду

#### 1. Element інтерфейс
```typescript
interface Element {
  accept(visitor: Visitor): void;
}
```

**Особливості:**
- **accept()**: Приймає відвідувача
- **Подвійна диспетчеризація**: Викликає правильний метод відвідувача

#### 2. Concrete Elements
```typescript
class ElementA implements Element {
  accept(visitor: Visitor): void {
    visitor.visitElementA(this);
  }
}

class ElementB implements Element {
  accept(visitor: Visitor): void {
    visitor.visitElementB(this);
  }
}
```

**Особливості:**
- **Делегування**: Делегує виклик відвідувачу
- **Типізація**: Кожен елемент викликає свій метод відвідувача

#### 3. Visitor інтерфейс
```typescript
interface Visitor {
  visitElementA(element: ElementA): void;
  visitElementB(element: ElementB): void;
}
```

**Особливості:**
- **Методи**: Метод для кожного типу елемента
- **Перевантаження**: Різні методи для різних елементів

#### 4. Concrete Visitor
```typescript
class ConcreteVisitor implements Visitor {
  visitElementA(element: ElementA): void {
    console.log('Visiting ElementA');
  }

  visitElementB(element: ElementB): void {
    console.log('Visiting ElementB');
  }
}
```

**Особливості:**
- **Реалізація**: Конкретна логіка для кожного елемента
- **Операції**: Групує операції в одному місці

## Типи Visitor патернів

### 1. Simple Visitor (Простий відвідувач)
- Базові операції
- Мінімальна логіка
- Найпростіший варіант

### 2. Accumulating Visitor (Акумулюючий відвідувач)
- Збирає дані з елементів
- Акумулює результат
- Складніша логіка

### 3. Hierarchical Visitor (Ієрархічний відвідувач)
- Працює з ієрархіями
- Рекурсивна обробка
- Складніша структура

## Приклади використання

### 1. Обхід дерева
```typescript
interface Node {
  accept(visitor: Visitor): void;
}

class FileNode implements Node {
  accept(visitor: Visitor): void {
    visitor.visitFile(this);
  }
}

class DirectoryNode implements Node {
  accept(visitor: Visitor): void {
    visitor.visitDirectory(this);
  }
}
```

### 2. Експорт даних
```typescript
class XMLExportVisitor implements Visitor {
  visitElementA(element: ElementA): void {
    console.log('<ElementA>...</ElementA>');
  }

  visitElementB(element: ElementB): void {
    console.log('<ElementB>...</ElementB>');
  }
}
```

### 3. Обчислення
```typescript
class CalculateVisitor implements Visitor {
  private result: number = 0;

  visitElementA(element: ElementA): void {
    this.result += 10;
  }

  visitElementB(element: ElementB): void {
    this.result += 20;
  }

  getResult(): number {
    return this.result;
  }
}
```

## Порівняння з іншими патернами

### Visitor vs Iterator
- **Visitor**: Додає операції до об'єктів
- **Iterator**: Обходить колекції

### Visitor vs Strategy
- **Visitor**: Операції над об'єктами
- **Strategy**: Вибір алгоритму

### Visitor vs Command
- **Visitor**: Операції над структурою
- **Command**: Інкапсуляція запитів

## Альтернативи

1. **Method Overloading** - для простих випадків
2. **Type Checking** - для динамічних мов
3. **Polymorphism** - для базових випадків
4. **Extension Methods** - для розширення функціональності

## Висновок

Visitor - це потужний патерн для додавання операцій до об'єктів без зміни їх класів. Він особливо корисний для стабільних структур з часто змінними операціями, але може ускладнити додавання нових елементів та збільшити складність коду.
