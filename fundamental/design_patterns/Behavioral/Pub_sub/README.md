# Патерн Pub-Sub (Publish-Subscribe)

евент емітер

## Опис

Pub-Sub (Publish-Subscribe) - це патерн поведінки, який дозволяє об'єктам підписуватися на події та отримувати сповіщення, коли події відбуваються. Патерн забезпечує слабке зв'язування між видавцем (publisher) та підписниками (subscribers).

## Основні принципи

- **Розділення**: Видавець не знає про підписників
- **Підписка**: Підписники реєструються на події
- **Сповіщення**: Видавець сповіщає всіх підписників
- **Слабке зв'язування**: Видавець та підписники не залежать один від одного
- **Гнучкість**: Легко додавати та видаляти підписників

## Переваги

- ✅ Слабке зв'язування між компонентами
- ✅ Легко додавати нових підписників
- ✅ Гнучкість у управлінні подіями
- ✅ Масштабованість
- ✅ Розширюваність
- ✅ Підтримує принцип відкритості/закритості

## Недоліки

- ❌ Може ускладнити налагодження
- ❌ Складність у відстеженні потоків подій
- ❌ Потенційні проблеми з пам'яттю
- ❌ Може призвести до неочікуваної поведінки
- ❌ Складність у тестуванні

## Коли використовувати

- Коли потрібна слабка зв'язаність між компонентами
- Коли хочете підтримувати підписку на події
- Коли потрібна гнучкість у управлінні подіями
- Коли хочете розділити видавця та підписників
- Коли потрібна масштабованість

## Структура патерну

### Компоненти

1. **Publisher** - видавець (Emitter)
2. **Subscriber** - підписник (Listener)
3. **Event** - подія
4. **Event Bus** - шина подій

## Реалізація (base.ts)

### Аналіз коду

#### 1. Інтерфейс подій
```typescript
interface IEvents {
  [key: string]: Array<() => void>;
}
```

**Особливості:**
- **Словник**: Ключ - тип події, значення - масив слухачів
- **Типізація**: Кожен слухач - функція без параметрів
- **Гнучкість**: Підтримує багато типів подій

#### 2. Emitter (Publisher)
```typescript
class Emitter {
  private events: IEvents = {};

  public on(type: string, listener: () => void) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  }

  public emit(type: string) {
    if(this.events[type]) {
      this.events[type].forEach(listener => listener());
    }
  }
}
```

**Особливості:**
- **on()**: Підписка на подію (додає слухача)
- **emit()**: Публікація події (викликає всіх слухачів)
- **Зберігання**: Зберігає всіх слухачів для кожного типу події
- **Розсилка**: Викликає всіх підписників при emit

#### 3. Використання
```typescript
const emtr = new Emitter();

emtr.on('greet', function() {
   console.log('Welcome!');
});

emtr.on('greet', function() {
  console.log('Greetings!');
});

emtr.emit('greet');
// Welcome!
// Greetings!
```

**Особливості:**
- **Підписка**: Кілька підписників на одну подію
- **Публікація**: Один emit викликає всіх підписників
- **Порядок**: Підписники викликаються в порядку підписки

## Типи Pub-Sub патернів

### 1. Simple Pub-Sub (Простий)
- Базова підписка та публікація
- Синхронне виконання
- Мінімальна функціональність

### 2. Topic-based Pub-Sub (Тематичний)
- Підписка на теми
- Фільтрація подій
- Більше гнучкості

### 3. Event Bus (Шина подій)
- Глобальна шина подій
- Централізоване управління
- Використовується в архітектурах

## Приклади використання

### 1. UI події
```typescript
const emitter = new Emitter();

emitter.on('click', () => {
  console.log('Button clicked');
});

emitter.on('hover', () => {
  console.log('Button hovered');
});

emitter.emit('click');
```

### 2. Модульна система
```typescript
const eventBus = new Emitter();

// Модуль A
eventBus.on('data-loaded', () => {
  console.log('Data loaded');
});

// Модуль B
eventBus.emit('data-loaded');
```

### 3. Комунікація компонентів
```typescript
const mediator = new Emitter();

// Компонент 1
mediator.on('update', () => {
  // Оновлення компонента
});

// Компонент 2
mediator.emit('update');
```

## Розширення функціональності

### Додавання відписки
```typescript
class Emitter {
  off(type: string, listener: () => void): void {
    if (this.events[type]) {
      this.events[type] = this.events[type].filter(l => l !== listener);
    }
  }
}
```

### Додавання одноразової підписки
```typescript
class Emitter {
  once(type: string, listener: () => void): void {
    const wrapper = () => {
      listener();
      this.off(type, wrapper);
    };
    this.on(type, wrapper);
  }
}
```

### Додавання параметрів
```typescript
interface IEvents {
  [key: string]: Array<(...args: any[]) => void>;
}

class Emitter {
  emit(type: string, ...args: any[]): void {
    if(this.events[type]) {
      this.events[type].forEach(listener => listener(...args));
    }
  }
}
```

## Порівняння з іншими патернами

### Pub-Sub vs Observer
- **Pub-Sub**: Видавець не знає про підписників
- **Observer**: Subject знає про спостерігачів

### Pub-Sub vs Mediator
- **Pub-Sub**: Одностороння комунікація (один до багатьох)
- **Mediator**: Двостороння комунікація (координація)

### Pub-Sub vs Event Bus
- **Pub-Sub**: Патерн проектування
- **Event Bus**: Архітектурний підхід

## Альтернативи

1. **Observer Pattern** - для прямих сповіщень
2. **Mediator Pattern** - для координації взаємодій
3. **Command Pattern** - для інкапсуляції запитів
4. **Callbacks** - для простих випадків

## Висновок

Pub-Sub - це потужний патерн для слабкого зв'язування компонентів через події. Він особливо корисний для модульних систем, UI компонентів та архітектур з подійною орієнтацією, але може ускладнити налагодження та відстеження потоків подій.
