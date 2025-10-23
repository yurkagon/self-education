# Патерн Module (Модуль)

## Опис

Module - це структурний патерн проектування, який організовує код в логічні блоки з чіткою структурою та інкапсуляцією. Патерн використовує замикання (closures) для створення приватного простору імен та структурування коду в модулі.

## Основні принципи

- **Структура коду**: Організація коду в логічні блоки
- **Інкапсуляція**: Приватний стан та публічний API
- **Замикання**: Використання closures для створення приватного простору
- **Простір імен**: Уникнення забруднення глобального простору
- **Модульність**: Чітке розділення відповідальностей
- **Повторне використання**: Модулі можна легко імпортувати та використовувати

## Переваги

- ✅ Інкапсуляція приватного стану
- ✅ Уникнення забруднення глобального простору
- ✅ Модульність та організація коду
- ✅ Легке тестування
- ✅ Повторне використання
- ✅ Простота реалізації

## Недоліки

- ❌ Може ускладнити налагодження
- ❌ Обмежена наслідуваність
- ❌ Може призвести до великої кількості модулів
- ❌ Складність у великих системах

## Коли використовувати

- Коли потрібно структурувати код в логічні блоки
- Коли хочете уникнути забруднення глобального простору
- Коли потрібна інкапсуляція функціональності
- Коли хочете організувати код в модулі
- Коли потрібно створити чітку структуру API
- Коли потрібно розділити відповідальності в коді

## Типи Module патернів

### 1. IIFE Module (Immediately Invoked Function Expression)
- Найпростіший варіант
- Виконується одразу після створення
- Повертає публічний API

### 2. Revealing Module Pattern
- Явно повертає публічні методи
- Чітке розділення приватного та публічного
- Легко читається та розуміється

### 3. Namespace Module
- Створює простір імен
- Організує код в ієрархії
- Уникнення конфліктів імен

## Реалізація (function.js)

### Аналіз коду

```javascript
const Module = (() => {
  const items = [];  // Приватний стан

  return {  // Публічний API
    getItem: index => items[index],
    addItem: item => items.push(item),
    getArray: () => items,
    log: () => console.log(items)
  };
})();  // Виконується одразу
```

#### 1. Структура модуля

**IIFE (Immediately Invoked Function Expression):**
```javascript
const Module = (() => {
  // Приватний код
})();
```

**Особливості:**
- Функція виконується одразу після створення
- Повертає об'єкт з публічним API
- Створює замикання для приватного стану

#### 2. Приватний стан

```javascript
const items = [];  // Приватна змінна
```

**Особливості:**
- Недоступна ззовні модуля
- Зберігається в замиканні
- Може бути змінена тільки через публічні методи

#### 3. Публічний API

```javascript
return {
  getItem: index => items[index],      // Читання елемента
  addItem: item => items.push(item),    // Додавання елемента
  getArray: () => items,               // Отримання масиву
  log: () => console.log(items)        // Логування
};
```

**Особливості:**
- Тільки ці методи доступні ззовні
- Контрольований доступ до приватного стану
- Чіткий інтерфейс модуля

#### 4. Використання

```javascript
Module.addItem('some item');
Module.addItem('another item');
Module.log();
```

**Особливості:**
- Простий доступ до функціональності
- Чіткий API
- Легко тестувати

## Розширення функціональності

### Додавання нових методів

```javascript
const Module = (() => {
  const items = [];
  let count = 0;

  return {
    // Існуючі методи
    getItem: index => items[index],
    addItem: item => items.push(item),
    getArray: () => items,
    log: () => console.log(items),
    
    // Нові методи
    getCount: () => count,
    increment: () => count++,
    clear: () => {
      items.length = 0;
      count = 0;
    }
  };
})();
```

### Додавання валідації

```javascript
const Module = (() => {
  const items = [];

  return {
    addItem: item => {
      if (typeof item === 'string' && item.length > 0) {
        items.push(item);
        return true;
      }
      return false;
    },
    
    getItem: index => {
      if (index >= 0 && index < items.length) {
        return items[index];
      }
      return null;
    }
  };
})();
```

### Створення підмодулів

```javascript
const Module = (() => {
  const items = [];
  
  const utils = {
    validate: item => typeof item === 'string',
    format: item => item.trim().toLowerCase()
  };

  return {
    addItem: item => {
      if (utils.validate(item)) {
        items.push(utils.format(item));
      }
    },
    
    getUtils: () => utils  // Доступ до утиліт
  };
})();
```

## Приклади використання

### 1. Кеш модуль

```javascript
const Cache = (() => {
  const cache = new Map();
  
  return {
    set: (key, value) => cache.set(key, value),
    get: key => cache.get(key),
    has: key => cache.has(key),
    clear: () => cache.clear(),
    size: () => cache.size
  };
})();
```

### 2. API модуль

```javascript
const API = (() => {
  const baseURL = 'https://api.example.com';
  const token = null;
  
  return {
    setToken: t => token = t,
    get: endpoint => fetch(`${baseURL}${endpoint}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }),
    post: (endpoint, data) => fetch(`${baseURL}${endpoint}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(data)
    })
  };
})();
```

### 3. Конфігурація модуль

```javascript
const Config = (() => {
  const settings = {
    debug: false,
    apiUrl: 'https://api.example.com',
    timeout: 5000
  };
  
  return {
    get: key => settings[key],
    set: (key, value) => settings[key] = value,
    getAll: () => ({ ...settings }),
    reset: () => Object.assign(settings, {
      debug: false,
      apiUrl: 'https://api.example.com',
      timeout: 5000
    })
  };
})();
```

## Порівняння з іншими патернами

### Module vs Singleton
- **Module**: Функціональний підхід, замикання
- **Singleton**: Класовий підхід, єдиний екземпляр

### Module vs Namespace
- **Module**: Інкапсуляція, приватний стан
- **Namespace**: Організація, структурування

### Module vs Factory
- **Module**: Створення API, інкапсуляція
- **Factory**: Створення об'єктів

## Сучасні альтернативи

### 1. ES6 Modules
```javascript
// module.js
const items = [];
export const addItem = item => items.push(item);
export const getItem = index => items[index];
```

### 2. CommonJS
```javascript
// module.js
const items = [];
module.exports = {
  addItem: item => items.push(item),
  getItem: index => items[index]
};
```

### 3. AMD (Asynchronous Module Definition)
```javascript
define(['dependency'], function(dependency) {
  const items = [];
  return {
    addItem: item => items.push(item),
    getItem: index => items[index]
  };
});
```

## Висновок

Module патерн - це простий та ефективний спосіб організації коду в JavaScript. Він особливо корисний для створення інкапсульованих API та уникнення забруднення глобального простору. Хоча сучасні модульні системи (ES6, CommonJS) замінюють його в багатьох випадках, Module патерн все ще корисний для простих проектів та навчання принципам інкапсуляції.
