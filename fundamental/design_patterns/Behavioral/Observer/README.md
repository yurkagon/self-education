# Патерн Observer (Спостерігач)

Підписка на події

## Опис

Observer - це патерн поведінки, який визначає залежність "один до багатьох" між об'єктами. Коли стан одного об'єкта (Subject) змінюється, всі залежні від нього об'єкти (Observers) автоматично отримують сповіщення та оновлюються.

## Основні принципи

- **Залежність**: Об'єкт залежить від стану іншого об'єкта
- **Сповіщення**: Автоматичне сповіщення про зміни
- **Підписка**: Спостерігачі підписуються на об'єкт
- **Розділення**: Subject не знає про деталі Observer
- **Гнучкість**: Легко додавати та видаляти спостерігачів

## Переваги

- ✅ Слабке зв'язування між Subject та Observer
- ✅ Динамічна підписка та відписка
- ✅ Автоматичне сповіщення про зміни
- ✅ Легко додавати нових спостерігачів
- ✅ Підтримує принцип відкритості/закритості
- ✅ Розширюваність

## Недоліки

- ❌ Може ускладнити налагодження
- ❌ Складність у відстеженні потоків сповіщень
- ❌ Потенційні проблеми з пам'яттю
- ❌ Може призвести до неочікуваної поведінки
- ❌ Проблеми з порядком сповіщень

## Коли використовувати

- Коли зміна стану одного об'єкта потребує зміни інших об'єктів
- Коли хочете слабке зв'язування між компонентами
- Коли потрібна гнучкість у підписці на події
- Коли хочете розділити Subject та Observer
- Коли потрібна масштабованість

## Структура патерну

### Компоненти

1. **Subject** - об'єкт, який сповіщає про зміни
2. **Observer** - інтерфейс спостерігача
3. **ConcreteObserver** - конкретний спостерігач
4. **Client** - клієнт

## Реалізація (typescript.ts)

### Аналіз коду

#### 1. Publisher (Subject)
```typescript
class Publisher {
  private observers: Subscriber[] = [];

  public register(observer: Subscriber): void {
    this.observers.push(observer);
  }

  public unregister(observer: Subscriber): void {
    const n: number = this.observers.indexOf(observer);
    this.observers.splice(n, 1);
  }

  public notify(): void {
    for (let i = 0; i < this.observers.length; i++) {
      this.observers[i].notify(i);
    }
  }
}
```

**Особливості:**
- **Реєстрація**: Додає спостерігачів до списку
- **Відписка**: Видаляє спостерігачів зі списку
- **Сповіщення**: Викликає метод notify() у всіх спостерігачів
- **Зберігання**: Зберігає список всіх спостерігачів

#### 2. Subscriber (Observer)
```typescript
class Subscriber {
  private name: string;
  private state: number;

  constructor (name: string) {
    this.name = name;
  }

  public notify(message: number): void {
    this.state = message;
  }
}
```

**Особливості:**
- **Отримання**: Отримує сповіщення через метод notify()
- **Оновлення**: Оновлює свій стан на основі сповіщення
- **Незалежність**: Не знає про інших спостерігачів
- **Реакція**: Реагує на зміни в Subject

#### 3. Використання
```typescript
const publisher = new Publisher();
const subscriber1 = new Subscriber('Subscriber 1');
const subscriber2 = new Subscriber('Subscriber 2');

publisher.register(subscriber1);
publisher.register(subscriber2);

publisher.notify(); // Сповіщає всіх спостерігачів
```

**Особливості:**
- **Підписка**: Спостерігачі реєструються в Subject
- **Сповіщення**: Один виклик notify() сповіщає всіх
- **Автоматичність**: Спостерігачі автоматично оновлюються

## Реалізація (Redux.js)

### Аналіз коду

Redux - це реалізація Observer патерну для управління станом.

#### 1. Store (Subject)
```typescript
class Store {
  constructor(reducer, initialState = {}) {
    this.state = initialState;
    this.reducer = reducer;
    this.subscriptions = {};
  }

  subscribe(key, callback) {
    this.subscriptions[key] = callback;
  }

  dispatch(action) {
    const oldState = this.state;
    const newState = this.reduce(action);
    this.state = newState;
    
    Object.keys(this.subscriptions).forEach(el => (
      this.subscriptions[el](newState, oldState, action)
    ));
  }
}
```

**Особливості:**
- **Підписка**: Підписники реєструються з ключем
- **Діспетчеризація**: dispatch() змінює стан та сповіщає підписників
- **Redux-стиль**: Використовує reducer для оновлення стану
- **Сповіщення**: Передає новий стан, старий стан та action

#### 2. Використання
```typescript
const store = new Store(reducer, {});

store.subscribe('component1', (newState, oldState, action) => {
  console.log('Component 1 updated:', newState);
});

store.dispatch({ type: 'INCREMENT' });
```

**Особливості:**
- **Підписка**: Компоненти підписуються на зміни стану
- **Діспетчеризація**: Dispatch action сповіщає всіх підписників
- **Redux-паттерн**: Класичний приклад Observer в Redux

## Типи Observer патернів

### 1. Push Model (Push-модель)
- Subject передає дані Observer
- Observer отримує всі дані
- Більш простий підхід

### 2. Pull Model (Pull-модель)
- Subject сповіщає про зміну
- Observer сам отримує дані
- Більш гнучкий підхід

### 3. Push-Pull Hybrid (Гібридна модель)
- Комбінація обох підходів
- Максимальна гнучкість
- Складніша реалізація

## Приклади використання

### 1. UI компоненти
```typescript
class Model {
  private observers: View[] = [];

  notify(): void {
    this.observers.forEach(observer => observer.update());
  }
}

class View {
  update(): void {
    // Оновлення UI
  }
}
```

### 2. Модель-Представлення
```typescript
// Model (Subject)
class DataModel {
  private data: any;
  private observers: DataObserver[] = [];

  setData(data: any): void {
    this.data = data;
    this.notify();
  }
}

// View (Observer)
class DataView {
  update(data: any): void {
    // Оновлення відображення
  }
}
```

### 3. Сповіщення
```typescript
class NotificationCenter {
  private subscribers: NotificationSubscriber[] = [];

  notify(message: string): void {
    this.subscribers.forEach(sub => sub.receive(message));
  }
}
```

## Розширення функціональності

### Додавання фільтрації
```typescript
class Publisher {
  notify(type: string): void {
    this.observers
      .filter(obs => obs.interestedIn(type))
      .forEach(obs => obs.notify(type));
  }
}
```

### Додавання пріоритетів
```typescript
class Publisher {
  private observers: Array<{observer: Observer, priority: number}> = [];

  notify(): void {
    this.observers
      .sort((a, b) => b.priority - a.priority)
      .forEach(item => item.observer.notify());
  }
}
```

### Додавання асинхронності
```typescript
class Publisher {
  async notify(): Promise<void> {
    await Promise.all(
      this.observers.map(obs => obs.notify())
    );
  }
}
```

## Порівняння з іншими патернами

### Observer vs Pub-Sub
- **Observer**: Subject знає про спостерігачів
- **Pub-Sub**: Видавець не знає про підписників

### Observer vs Mediator
- **Observer**: Одностороння комунікація (один до багатьох)
- **Mediator**: Двостороння комунікація (координація)

### Observer vs Chain of Responsibility
- **Observer**: Всі спостерігачі отримують сповіщення
- **Chain**: Запит обробляється по ланцюжку

## Альтернативи

1. **Pub-Sub Pattern** - для слабкого зв'язування
2. **Mediator Pattern** - для координації взаємодій
3. **Event Bus** - для подійної архітектури
4. **Reactive Programming** - для реактивних систем

## Висновок

Observer - це потужний патерн для автоматичного сповіщення про зміни стану. Він особливо корисний для UI компонентів, моделей даних та систем з подійною орієнтацією. Redux - це класичний приклад Observer патерну в практичному застосуванні для управління станом додатків.
