# Патерн Template Method (Шаблонний метод)

Задає шаблон. Тобто ООП, наслідування і тд

## Опис

Template Method - це патерн поведінки, який визначає скелет алгоритму в базовому класі, дозволяючи підкласам перевизначати окремі кроки алгоритму, не змінюючи його загальну структуру.

## Основні принципи

- **Скелет алгоритму**: Базовий клас визначає структуру алгоритму
- **Перевизначення**: Підкласи можуть перевизначати окремі кроки
- **Контроль**: Базовий клас контролює виконання алгоритму
- **Наслідування**: Використовує наслідування для розширення
- **Гнучкість**: Легко додавати нові варіанти алгоритму

## Переваги

- ✅ Інкапсулює загальну структуру алгоритму
- ✅ Уникає дублювання коду
- ✅ Контролює структуру алгоритму
- ✅ Легко додавати нові варіанти
- ✅ Підтримує принцип DRY (Don't Repeat Yourself)
- ✅ Покращує читабельність

## Недоліки

- ❌ Обмежена гнучкість через наслідування
- ❌ Може призвести до глибоких ієрархій
- ❌ Складність у налагодженні
- ❌ Може бути надмірним для простих випадків
- ❌ Порушує принцип композиції над наслідуванням

## Коли використовувати

- Коли є алгоритм з фіксованою структурою
- Коли хочете уникнути дублювання коду
- Коли потрібен контроль над структурою алгоритму
- Коли хочете дозволити підкласам змінювати окремі кроки
- Коли потрібна гнучкість у реалізації кроків

## Структура патерну

### Компоненти

1. **AbstractClass** - абстрактний клас з шаблонним методом
2. **ConcreteClass** - конкретні класи, що реалізують кроки
3. **Template Method** - метод, що визначає структуру
4. **Hook Methods** - методи, що можуть бути перевизначені

## Реалізація (base.ts)

### Аналіз коду

#### 1. Абстрактний клас (Enemy)
```typescript
abstract class Enemy {
  attack() {
    console.log('attack');
  }

  sleep() {
    console.log('sleep');
  }
}
```

**Особливості:**
- **Базовий клас**: Визначає загальну структуру поведінки
- **Методи**: Визначає методи, які можуть бути перевизначені
- **Загальна логіка**: Містить загальну логіку для всіх ворогів
- **Абстрактність**: Може бути абстрактним або конкретним

#### 2. Конкретні класи
```typescript
class Warrior extends Enemy {
  attack() {
    console.log('get sword');
    super.attack();
  }
}

class Orc extends Enemy {
  sleep() {
    console.log('I dont wanna sleep');
  }
}
```

**Особливості:**
- **Перевизначення**: Warrior перевизначає attack(), додаючи логіку
- **Виклик базового**: Використовує super.attack() для виклику базової логіки
- **Повна заміна**: Orc повністю замінює sleep()
- **Спеціалізація**: Кожен клас має свою специфічну поведінку

#### 3. Використання
```typescript
const warrior = new Warrior();
warrior.attack(); // get sword -> attack

const orc = new Orc();
orc.sleep(); // I dont wanna sleep
```

**Особливості:**
- **Структура**: Загальна структура залишається незмінною
- **Варіації**: Кожен клас має свої варіації методів
- **Контроль**: Базовий клас контролює загальну структуру

## Типи Template Method патернів

### 1. Simple Template (Простий шаблон)
- Базові методи для перевизначення
- Мінімальна структура
- Найпростіший варіант

### 2. Template with Hooks (Шаблон з хуками)
- Hook методи для опціонального перевизначення
- Більше гнучкості
- Складніша структура

### 3. Template with Abstract Methods (Шаблон з абстрактними методами)
- Абстрактні методи, які повинні бути реалізовані
- Обов'язкова реалізація
- Строга структура

## Приклади використання

### 1. Алгоритм обробки даних
```typescript
abstract class DataProcessor {
  process(): void {
    this.loadData();
    this.transformData();
    this.saveData();
  }

  abstract loadData(): void;
  abstract transformData(): void;
  abstract saveData(): void;
}

class CSVProcessor extends DataProcessor {
  loadData(): void {
    console.log('Loading CSV');
  }
  transformData(): void {
    console.log('Transforming CSV');
  }
  saveData(): void {
    console.log('Saving CSV');
  }
}
```

### 2. Ігровий персонаж
```typescript
abstract class Character {
  performAction(): void {
    this.move();
    this.attack();
    this.rest();
  }

  move(): void {
    console.log('Moving');
  }

  abstract attack(): void;

  rest(): void {
    console.log('Resting');
  }
}
```

### 3. Валідація форми
```typescript
abstract class FormValidator {
  validate(): boolean {
    return this.validateFields() && 
           this.validateRules() && 
           this.validateCustom();
  }

  abstract validateFields(): boolean;
  abstract validateRules(): boolean;
  abstract validateCustom(): boolean;
}
```

## Розширення функціональності

### Додавання hook методів
```typescript
abstract class Enemy {
  attack(): void {
    this.beforeAttack();
    console.log('attack');
    this.afterAttack();
  }

  protected beforeAttack(): void {
    // Hook метод - може бути перевизначений
  }

  protected afterAttack(): void {
    // Hook метод - може бути перевизначений
  }
}
```

### Додавання умовної логіки
```typescript
abstract class Enemy {
  attack(): void {
    if (this.shouldAttack()) {
      console.log('attack');
    }
  }

  protected shouldAttack(): boolean {
    return true; // Hook метод
  }
}
```

### Додавання параметрів
```typescript
abstract class Enemy {
  attack(target: string): void {
    console.log(`attack ${target}`);
  }
}

class Warrior extends Enemy {
  attack(target: string): void {
    console.log('get sword');
    super.attack(target);
  }
}
```

## Порівняння з іншими патернами

### Template Method vs Strategy
- **Template Method**: Використовує наслідування
- **Strategy**: Використовує композицію

### Template Method vs Factory Method
- **Template Method**: Визначає структуру алгоритму
- **Factory Method**: Визначає спосіб створення об'єктів

### Template Method vs State
- **Template Method**: Змінює кроки алгоритму
- **State**: Змінює поведінку залежно від стану

## Альтернативи

1. **Strategy Pattern** - для композиції алгоритмів
2. **Function Composition** - для функціонального підходу
3. **Inheritance** - для простих випадків
4. **Composition** - для більшої гнучкості

## Висновок

Template Method - це потужний патерн для визначення структури алгоритму та дозволу підкласам змінювати окремі кроки. Він особливо корисний для алгоритмів з фіксованою структурою та різними реалізаціями кроків, але може обмежити гнучкість через використання наслідування.
