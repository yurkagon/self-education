# Патерн Facade (Фасад)

Приховує шось складне за простим інтерфейсом.

## Опис

Facade - це структурний патерн проектування, який надає спрощений інтерфейс для складних підсистем. Патерн приховує складність системи за простим інтерфейсом, роблячи її більш зрозумілою та легкою у використанні.

## Основні принципи

- **Спрощення**: Приховує складність підсистеми
- **Уніфікація**: Надає єдиний інтерфейс для різних компонентів
- **Інкапсуляція**: Приховує деталі реалізації
- **Зручність**: Робить систему простішою для використання
- **Абстракція**: Надає високорівневий інтерфейс

## Переваги

- ✅ Спрощує використання складних систем
- ✅ Приховує складність від клієнта
- ✅ Покращує читабельність коду
- ✅ Зменшує залежність від підсистем
- ✅ Легко тестувати та підтримувати
- ✅ Можна додавати додаткову логіку

## Недоліки

- ❌ Може стати "божественним об'єктом"
- ❌ Приховує важливі деталі
- ❌ Може ускладнити налагодження
- ❌ Додатковий рівень абстракції
- ❌ Може обмежити гнучкість

## Коли використовувати

- Коли система має багато взаємопов'язаних класів
- Коли потрібно спростити складний інтерфейс
- Коли хочете приховати складність від клієнта
- Коли потрібен єдиний точку доступу до підсистеми
- Коли хочете розділити клієнтів та підсистему

## Структура патерну

### Компоненти

1. **Facade** - фасад, спрощений інтерфейс
2. **Subsystem Classes** - класи підсистеми
3. **Client** - клієнт, який використовує фасад

## Реалізація (base.ts)

### Аналіз коду

#### 1. Класи підсистеми
```typescript
class Part1 {
  public method1(): void {
    console.log("method1");
  }
}

class Part2 {
  public method2(): void {
    console.log("method2");
  }
}

class Part3 {
  public method3(): void {
    console.log("method3");
  }
}
```

**Особливості:**
- **Незалежні класи**: Кожен має свою функціональність
- **Проста логіка**: Базові методи для демонстрації
- **Складність**: В реальних системах можуть бути складнішими

#### 2. Facade клас
```typescript
class Facade {
  private readonly part1: Part1;
  private readonly part2: Part2;
  private readonly part3: Part3;

  constructor(part1?: Part1, part2?: Part2, part3?: Part3) {
    this.part1 = part1 || new Part1();
    this.part2 = part2 || new Part2();
    this.part3 = part3 || new Part3();
  }

  public operation1(): void {
    this.part1.method1();
    this.part2.method2();
  }

  public operation2(): void {
    this.part1.method1();
    this.part3.method3();
  }
}
```

**Особливості:**
- **Інкапсуляція**: Приховує складність підсистеми
- **Спрощений інтерфейс**: Тільки необхідні методи
- **Координація**: Об'єднує різні компоненти
- **Гнучкість**: Можна передавати залежності

## Реалізація (typescript.ts)

### Аналіз коду

#### 1. jQuery-подібний Facade
```typescript
class jQuery {
  private target: HTMLElement;

  constructor(selector: string) {
    this.target = document.querySelector(selector);
  }

  public html(str: string) {
    this.target.innerHTML = str;
    return this;
  }
}

const $ = (selector: string) => new jQuery(selector);
```

**Особливості:**
- **Спрощений DOM API**: Приховує складність роботи з DOM
- **Fluent Interface**: Методи повертають `this`
- **Ланцюжкові виклики**: `$('#some_id').html('hello').html('world')`
- **Функціональний підхід**: Глобальна функція `$`

## Типи Facade патернів

### 1. Simple Facade (Простий фасад)
- Один клас для всієї підсистеми
- Мінімальна функціональність
- Легко зрозуміти та реалізувати

### 2. Complex Facade (Складний фасад)
- Кілька класів для різних частин
- Розширена функціональність
- Більше гнучкості та контролю

### 3. Fluent Facade (Плавний фасад)
- Методи повертають `this`
- Ланцюжкові виклики
- Покращена читабельність

## Приклади використання

### 1. Файлова система
```typescript
class FileSystemFacade {
  public createFile(path: string, content: string): void {
    // Складна логіка створення файлу
  }

  public readFile(path: string): string {
    // Складна логіка читання файлу
  }

  public deleteFile(path: string): void {
    // Складна логіка видалення файлу
  }
}
```

### 2. База даних
```typescript
class DatabaseFacade {
  public saveUser(user: User): void {
    // Валідація, збереження, логування
  }

  public getUser(id: string): User {
    // Пошук, кешування, обробка помилок
  }
}
```

### 3. API клієнт
```typescript
class APIFacade {
  public async fetchData(endpoint: string): Promise<any> {
    // Аутентифікація, запит, обробка відповіді
  }
}
```

## Розширення функціональності

### Додавання логування
```typescript
class Facade {
  private log(message: string): void {
    console.log(`[Facade] ${message}`);
  }

  public operation1(): void {
    this.log('Starting operation1');
    this.part1.method1();
    this.part2.method2();
    this.log('Completed operation1');
  }
}
```

### Додавання валідації
```typescript
class Facade {
  public operation1(): void {
    if (this.validate()) {
      this.part1.method1();
      this.part2.method2();
    }
  }

  private validate(): boolean {
    // Логіка валідації
    return true;
  }
}
```

### Додавання кешування
```typescript
class Facade {
  private cache: Map<string, any> = new Map();

  public operation1(): void {
    const key = 'operation1';
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    
    this.part1.method1();
    this.part2.method2();
    this.cache.set(key, 'result');
  }
}
```

## Порівняння з іншими патернами

### Facade vs Adapter
- **Facade**: Спрощує інтерфейс існуючої системи
- **Adapter**: Адаптує несумісні інтерфейси

### Facade vs Proxy
- **Facade**: Спрощує доступ до підсистеми
- **Proxy**: Контролює доступ до об'єкта

### Facade vs Mediator
- **Facade**: Одностороння комунікація (клієнт → підсистема)
- **Mediator**: Двостороння комунікація (об'єкти ↔ об'єкти)

## Антипатерни

### 1. God Object (Божественний об'єкт)
```typescript
// Погано - занадто багато відповідальностей
class GodFacade {
  public handleUsers(): void { }
  public handleOrders(): void { }
  public handlePayments(): void { }
  public handleInventory(): void { }
  // ... багато інших методів
}
```

### 2. Leaky Abstraction (Протікаюча абстракція)
```typescript
// Погано - приховує важливі деталі
class Facade {
  public processData(): void {
    // Приховує критичні помилки
    try {
      this.complexOperation();
    } catch (error) {
      // Ігнорує помилки
    }
  }
}
```

## Альтернативи

1. **Adapter Pattern** - для адаптації інтерфейсів
2. **Proxy Pattern** - для контролю доступу
3. **Mediator Pattern** - для координації об'єктів
4. **Command Pattern** - для інкапсуляції запитів

## Висновок

Facade - це потужний патерн для спрощення складних систем. Він особливо корисний коли потрібно надати простий інтерфейс для складної підсистеми або коли хочете приховати деталі реалізації від клієнта. Патерн покращує читабельність коду та робить систему більш зрозумілою, але потребує обережності, щоб не створити "божественний об'єкт".
