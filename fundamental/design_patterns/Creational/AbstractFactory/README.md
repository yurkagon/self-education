# Патерн Abstract Factory (Абстрактна фабрика)

## Опис

Abstract Factory - це креаційний патерн проектування, який надає інтерфейс для створення сімейств пов'язаних об'єктів без вказівки їх конкретних класів. Це "фабрика фабрик" - вона створює інші фабрики.

## Основні принципи

- **Сімейства об'єктів**: Створює пов'язані об'єкти, які працюють разом
- **Абстракція**: Клієнт працює з абстракціями, а не з конкретними класами
- **Консистентність**: Гарантує, що всі створені об'єкти сумісні між собою
- **Розширюваність**: Легко додавати нові сімейства об'єктів

## Переваги

- ✅ Гарантує сумісність об'єктів
- ✅ Приховує конкретні класи від клієнта
- ✅ Легко додавати нові сімейства
- ✅ Підтримує принцип відкритості/закритості
- ✅ Централізує створення пов'язаних об'єктів

## Недоліки

- ❌ Складно додавати нові типи об'єктів
- ❌ Може призвести до великої кількості класів
- ❌ Ускладнює архітектуру
- ❌ Може бути надмірним для простих випадків

## Коли використовувати

- Коли потрібно створювати сімейства пов'язаних об'єктів
- Коли система має бути незалежною від способу створення об'єктів
- Коли потрібно забезпечити сумісність об'єктів
- Коли хочете підтримувати різні варіанти продуктів

## Структура патерну

### Компоненти

1. **Abstract Product** - абстрактний продукт
2. **Concrete Product** - конкретний продукт
3. **Abstract Factory** - абстрактна фабрика
4. **Concrete Factory** - конкретна фабрика
5. **Client** - клієнт, який використовує фабрику

## Реалізація (base.ts)

### Аналіз коду

#### 1. Продукти (Products)

```typescript
// Абстрактний продукт - кнопка
interface Button {
  render(): void
}

// Конкретні продукти
class WindowsButton implements Button {
  render() {
    console.log('Windows Button')
  }
}

class MacButton implements Button {
  render() {
    console.log('Mac Button')
  }
}

// Абстрактний продукт - чекбокс
interface Checkbox {
  render(): void
}

// Конкретні продукти
class WindowsCheckbox implements Checkbox {
  render() {
    console.log('Windows Checkbox')
  }
}

class MacCheckbox implements Checkbox {
  render() {
    console.log('Mac Checkbox')
  }
}
```

**Особливості:**
- Кожен продукт має свій інтерфейс
- Конкретні реалізації для різних платформ
- Всі продукти мають спільний метод `render()`

#### 2. Фабрики (Factories)

```typescript
// Абстрактна фабрика
interface GUIFactory {
  createButton(): Button
  createCheckbox(): Checkbox
}

// Конкретна фабрика для Windows
class WindowsGUIFactory implements GUIFactory {
  createButton() {
    return new WindowsButton();
  }
  createCheckbox() {
    return new WindowsCheckbox();
  }
}

// Конкретна фабрика для Mac
class MacGUIFactory implements GUIFactory {
  createButton() {
    return new MacButton();
  }
  createCheckbox() {
    return new MacCheckbox();
  }
}
```

**Особливості:**
- Абстрактна фабрика визначає інтерфейс створення
- Кожна конкретна фабрика створює своє сімейство об'єктів
- Гарантує сумісність об'єктів всередині сімейства

#### 3. Клієнт (Client)

```typescript
const render = (factory: GUIFactory) => {
  factory.createButton();
  factory.createCheckbox();
}

// Використання
render(new WindowsGUIFactory());
render(new MacGUIFactory());
```

**Особливості:**
- Клієнт працює з абстракцією
- Не знає про конкретні класи
- Легко змінювати сімейства об'єктів

## Принцип роботи

### 1. Визначення сімейств
- **Windows сімейство**: WindowsButton + WindowsCheckbox
- **Mac сімейство**: MacButton + MacCheckbox

### 2. Створення фабрик
- Кожна фабрика створює тільки своє сімейство
- Гарантує сумісність об'єктів

### 3. Використання
- Клієнт отримує фабрику
- Створює об'єкти через фабрику
- Всі об'єкти сумісні між собою

## Розширення функціональності

### Додавання нового сімейства

```typescript
// Новий продукт
class LinuxButton implements Button {
  render() {
    console.log('Linux Button')
  }
}

class LinuxCheckbox implements Checkbox {
  render() {
    console.log('Linux Checkbox')
  }
}

// Нова фабрика
class LinuxGUIFactory implements GUIFactory {
  createButton() {
    return new LinuxButton();
  }
  createCheckbox() {
    return new LinuxCheckbox();
  }
}
```

### Додавання нового продукту

```typescript
// Новий тип продукту
interface TextField {
  render(): void
}

// Розширення інтерфейсу фабрики
interface GUIFactory {
  createButton(): Button
  createCheckbox(): Checkbox
  createTextField(): TextField  // Новий метод
}

// Реалізація в конкретних фабриках
class WindowsGUIFactory implements GUIFactory {
  // ... існуючі методи
  createTextField() {
    return new WindowsTextField();
  }
}
```

## Приклади використання

### 1. UI Framework
- Створення компонентів для різних платформ
- Windows, Mac, Linux інтерфейси

### 2. База даних
- Різні типи з'єднань (MySQL, PostgreSQL, MongoDB)
- Сумісні об'єкти для кожної БД

### 3. Ігри
- Різні стилі персонажів, зброї, споруд
- Фентезі, наукова фантастика, історичні

### 4. Документи
- Різні формати (PDF, Word, HTML)
- Сумісні компоненти для кожного формату

## Порівняння з іншими патернами

### Abstract Factory vs Factory Method
- **Abstract Factory**: Створює сімейства об'єктів
- **Factory Method**: Створює один тип об'єкта

### Abstract Factory vs Builder
- **Abstract Factory**: Різні сімейства об'єктів
- **Builder**: Складний об'єкт з багатьма частинами

## Альтернативи

1. **Factory Method** - для створення одного типу об'єктів
2. **Builder** - для складних об'єктів з багатьма параметрами
3. **Dependency Injection** - для ін'єкції залежностей

## Висновок

Abstract Factory - це потужний патерн для створення сімейств пов'язаних об'єктів. Він особливо корисний у великих системах, де потрібно забезпечити сумісність об'єктів та підтримувати різні варіанти реалізації. Патерн забезпечує гнучкість та розширюваність, але може ускладнити архітектуру при неправильному використанні.
