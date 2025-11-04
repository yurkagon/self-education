# Патерн Iterator (Ітератор)

Ітерація по колекції без розкриття внутрішньої структури

## Опис

Iterator - це патерн поведінки, який надає спосіб послідовного доступу до елементів колекції без розкриття її внутрішньої структури. Патерн дозволяє обходити елементи колекції незалежно від її реалізації.

## Основні принципи

- **Інкапсуляція**: Приховує внутрішню структуру колекції
- **Універсальність**: Єдиний спосіб обходу різних колекцій
- **Послідовність**: Доступ до елементів по черзі
- **Гнучкість**: Можна створювати різні способи обходу
- **Простота**: Спрощує роботу з колекціями

## Переваги

- ✅ Приховує внутрішню структуру колекції
- ✅ Уніфікує спосіб обходу різних колекцій
- ✅ Підтримує множинні ітерації
- ✅ Легко додавати нові типи колекцій
- ✅ Спрощує код клієнта
- ✅ Підтримує принцип єдиної відповідальності

## Недоліки

- ❌ Може бути надмірним для простих колекцій
- ❌ Додає складність до коду
- ❌ Може зменшити продуктивність
- ❌ Складність у налагодженні
- ❌ Потенційні проблеми з потокобезпекою

## Коли використовувати

- Коли потрібен спосіб обходу складних структур даних
- Коли хочете приховати внутрішню структуру колекції
- Коли потрібна уніфікація обходу різних колекцій
- Коли хочете підтримувати множинні ітерації
- Коли потрібна гнучкість у способі обходу

## Структура патерну

### Компоненти

1. **Iterator** - інтерфейс ітератора
2. **ConcreteIterator** - конкретна реалізація ітератора
3. **Aggregate** - інтерфейс колекції
4. **ConcreteAggregate** - конкретна колекція
5. **Client** - клієнт

## Реалізація (base.ts)

### Аналіз коду

#### 1. ArrayIterator клас
```typescript
class ArrayIterator {
  private index: number = 0;
  private items: Array<any>;

  constructor(items: Array<any>) {
    this.items = items;
  }
}
```

**Особливості:**
- **Інкапсуляція**: Приховує масив та поточний індекс
- **Ініціалізація**: Зберігає посилання на масив
- **Стан**: Відстежує поточну позицію через `index`

#### 2. Методи навігації
```typescript
public reset() {
  this.index = 0;
}

public first() {
  this.reset();
  return this.next();
}

public next() {
  return this.items[this.index++];
}

public hasNext() {
  return this.index <= this.items.length;
}
```

**Особливості:**
- **reset()**: Повертає ітератор на початок
- **first()**: Повертає перший елемент
- **next()**: Повертає поточний елемент та збільшує індекс
- **hasNext()**: Перевіряє, чи є наступний елемент

#### 3. Метод обходу
```typescript
public each(callback) {
  for (var item = this.first(); this.hasNext(); item = this.next()) {
    callback(item);
  }
}
```

**Особливості:**
- **each()**: Обходить всі елементи та викликає callback
- **Callback**: Приймає функцію для обробки кожного елемента
- **Автоматизація**: Спрощує обхід колекції

## Типи Iterator патернів

### 1. Simple Iterator (Простий ітератор)
- Послідовний обхід
- Основні методи: next(), hasNext()
- Найпростіший варіант

### 2. Bidirectional Iterator (Двонапрямлений ітератор)
- Обхід вперед та назад
- Методи: next(), previous(), hasNext(), hasPrevious()
- Більше гнучкості

### 3. Random Access Iterator (Ітератор з випадковим доступом)
- Доступ до будь-якого елемента
- Методи: get(index), set(index, value)
- Найбільша гнучкість

## Приклади використання

### 1. Обхід масиву
```typescript
const items = [1, 2, 3, 4, 5];
const iterator = new ArrayIterator(items);

while (iterator.hasNext()) {
  console.log(iterator.next());
}
```

### 2. Обхід з callback
```typescript
const items = ['a', 'b', 'c'];
const iterator = new ArrayIterator(items);

iterator.each((item) => {
  console.log(item);
});
```

### 3. Множинні ітерації
```typescript
const items = [1, 2, 3];
const iterator1 = new ArrayIterator(items);
const iterator2 = new ArrayIterator(items);

// Кожен ітератор має свій стан
console.log(iterator1.next()); // 1
console.log(iterator2.next()); // 1 (незалежно)
```

## Розширення функціональності

### Додавання методу current
```typescript
public current() {
  return this.items[this.index];
}
```

### Додавання методу previous
```typescript
public previous() {
  return this.items[--this.index];
}

public hasPrevious() {
  return this.index > 0;
}
```

### Додавання методу get
```typescript
public get(index: number) {
  return this.items[index];
}

public set(index: number, value: any) {
  this.items[index] = value;
}
```

## Порівняння з іншими патернами

### Iterator vs for...of
- **Iterator**: Патерн проектування з класами
- **for...of**: Вбудована мова JavaScript/TypeScript

### Iterator vs forEach
- **Iterator**: Більше контролю над процесом
- **forEach**: Простіший, але менш гнучкий

### Iterator vs Generator
- **Iterator**: Клас з методами
- **Generator**: Функція з yield

## Альтернативи

1. **for...of** - для простих випадків
2. **forEach** - для обробки всіх елементів
3. **Generator** - для лінивого обходу
4. **Map/Filter** - для функціонального підходу

## Висновок

Iterator - це потужний патерн для обходу колекцій. Він особливо корисний для складних структур даних та уніфікації способу обходу, але може бути надмірним для простих масивів у JavaScript/TypeScript, де є вбудовані методи обходу.
