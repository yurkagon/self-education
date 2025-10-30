# Патерн Adapter (Адаптер)

реальний і адаптер об'єкт наслідують один інтерфейс, адапептер перевикористовує і робить перетворення. Схоже на проксі, але адаптер перетворює інтерфейс.

## Опис

Adapter - це структурний патерн проектування, який дозволяє об'єктам з несумісними інтерфейсами працювати разом. Патерн діє як мост між двома існуючими інтерфейсами, перетворюючи інтерфейс одного класу в інтерфейс, очікуваний клієнтом.

## Основні принципи

- **Адаптація**: Перетворення одного інтерфейсу в інший
- **Сумісність**: Забезпечення роботи несумісних компонентів
- **Інкапсуляція**: Приховування складності адаптації
- **Повторне використання**: Використання існуючих класів
- **Мінімальні зміни**: Не змінює існуючий код

## Переваги

- ✅ Дозволяє використовувати існуючі класи
- ✅ Забезпечує сумісність несумісних інтерфейсів
- ✅ Мінімізує зміни в існуючому коді
- ✅ Покращує повторне використання коду
- ✅ Розділяє логіку адаптації
- ✅ Легко тестувати

## Недоліки

- ❌ Додає складність до коду
- ❌ Може призвести до великої кількості адаптерів
- ❌ Ускладнює розуміння коду
- ❌ Може приховати проблеми дизайну
- ❌ Додатковий рівень абстракції

## Коли використовувати

- Коли потрібно використовувати існуючий клас з несумісним інтерфейсом
- Коли хочете інтегрувати третій бібліотеки
- Коли потрібно адаптувати legacy код
- Коли хочете розділити логіку адаптації
- Коли потрібно забезпечити сумісність версій

## Структура патерну

### Компоненти

1. **Target** - цільовий інтерфейс, який очікує клієнт
2. **Adaptee** - існуючий клас з несумісним інтерфейсом
3. **Adapter** - клас, який адаптує Adaptee до Target
4. **Client** - клієнт, який використовує Target інтерфейс

## Реалізація (base.ts)

### Аналіз коду

#### 1. Adaptee клас
```typescript
class Adaptee {
  requestXML(): string {
    return 'xml';
  }
}
```

**Особливості:**
- **Існуючий клас**: Має свій інтерфейс
- **Несумісність**: Повертає XML замість JSON
- **Legacy код**: Може бути старою бібліотекою

#### 2. Target клас
```typescript
class Target {
  request(): string {
    return 'json';
  }
}
```

**Особливості:**
- **Цільовий інтерфейс**: Те, що очікує клієнт
- **Стандарт**: JSON формат
- **Очікування**: Клієнт розрахований на цей інтерфейс

#### 3. Adapter клас
```typescript
class Adapter extends Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    super();
    this.adaptee = adaptee;
  }

  public request(): string {
    const xml = this.adaptee.requestXML();
    const json = this.convertToJson(xml);
    return json;
  }

  private convertToJson(xml: string): string {
    return 'json';
  }
}
```

**Особливості:**
- **Наслідування**: Розширює Target
- **Композиція**: Містить Adaptee
- **Адаптація**: Перетворює XML в JSON
- **Інкапсуляція**: Приховує складність перетворення

#### 4. Client код
```typescript
const clientCode = (target: Target) => {
  target.request();
}

const adaptee = new Adaptee();
const adapter = new Adapter(adaptee);
clientCode(adapter);
```

**Особливості:**
- **Прозорість**: Клієнт не знає про адаптацію
- **Сумісність**: Працює з Target інтерфейсом
- **Гнучкість**: Може працювати з різними адаптерами

## Типи Adapter патернів

### 1. Class Adapter (Адаптер класу)
- Використовує множинне наслідування
- Адаптер наслідує і Target, і Adaptee
- Менш гнучкий, але простіший

### 2. Object Adapter (Адаптер об'єкта)
- Використовує композицію
- Адаптер містить Adaptee як поле
- Більш гнучкий та потужний

### 3. Two-way Adapter (Двосторонній адаптер)
- Адаптує в обидва боки
- Може працювати як Target, так і як Adaptee
- Складніший у реалізації

## Приклади використання

### 1. Адаптація API
```typescript
// Старий API
class OldAPI {
  public getData(): string {
    return 'old_format_data';
  }
}

// Новий API
interface NewAPI {
  fetchData(): Promise<string>;
}

// Адаптер
class APIAdapter implements NewAPI {
  private oldAPI: OldAPI;

  constructor(oldAPI: OldAPI) {
    this.oldAPI = oldAPI;
  }

  public async fetchData(): Promise<string> {
    const data = this.oldAPI.getData();
    return this.convertToNewFormat(data);
  }

  private convertToNewFormat(data: string): string {
    return `new_format_${data}`;
  }
}
```

### 2. Адаптація формату даних
```typescript
// XML сервіс
class XMLService {
  public getXMLData(): string {
    return '<data><item>value</item></data>';
  }
}

// JSON інтерфейс
interface JSONService {
  getJSONData(): string;
}

// Адаптер
class XMLToJSONAdapter implements JSONService {
  private xmlService: XMLService;

  constructor(xmlService: XMLService) {
    this.xmlService = xmlService;
  }

  public getJSONData(): string {
    const xml = this.xmlService.getXMLData();
    return this.xmlToJson(xml);
  }

  private xmlToJson(xml: string): string {
    // Спрощена конвертація
    return JSON.stringify({ data: { item: 'value' } });
  }
}
```

### 3. Адаптація UI компонентів
```typescript
// Старий UI компонент
class OldButton {
  public click(): void {
    console.log('Old button clicked');
  }
}

// Новий UI інтерфейс
interface ModernButton {
  onClick(): void;
}

// Адаптер
class ButtonAdapter implements ModernButton {
  private oldButton: OldButton;

  constructor(oldButton: OldButton) {
    this.oldButton = oldButton;
  }

  public onClick(): void {
    this.oldButton.click();
  }
}
```

## Розширення функціональності

### Додавання кешування
```typescript
class CachedAdapter extends Target {
  private adaptee: Adaptee;
  private cache: Map<string, string> = new Map();

  constructor(adaptee: Adaptee) {
    super();
    this.adaptee = adaptee;
  }

  public request(): string {
    const cacheKey = 'request';
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const xml = this.adaptee.requestXML();
    const json = this.convertToJson(xml);
    this.cache.set(cacheKey, json);
    return json;
  }
}
```

### Додавання логування
```typescript
class LoggingAdapter extends Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    super();
    this.adaptee = adaptee;
  }

  public request(): string {
    console.log('Adapter: Starting request');
    const xml = this.adaptee.requestXML();
    console.log('Adapter: Received XML data');
    const json = this.convertToJson(xml);
    console.log('Adapter: Converted to JSON');
    return json;
  }
}
```

### Додавання валідації
```typescript
class ValidatingAdapter extends Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    super();
    this.adaptee = adaptee;
  }

  public request(): string {
    const xml = this.adaptee.requestXML();
    if (!this.isValidXML(xml)) {
      throw new Error('Invalid XML data');
    }
    return this.convertToJson(xml);
  }

  private isValidXML(xml: string): boolean {
    return xml.length > 0;
  }
}
```

## Порівняння з іншими патернами

### Adapter vs Decorator
- **Adapter**: Змінює інтерфейс об'єкта
- **Decorator**: Додає нову функціональність

### Adapter vs Facade
- **Adapter**: Адаптує один інтерфейс до іншого
- **Facade**: Спрощує складний інтерфейс

### Adapter vs Proxy
- **Adapter**: Змінює інтерфейс
- **Proxy**: Контролює доступ до об'єкта

## Антипатерни

### 1. God Adapter (Божественний адаптер)
```typescript
// Погано - занадто багато відповідальностей
class GodAdapter {
  public adaptEverything(): void {
    // Адаптує все підряд
  }
}
```

### 2. Leaky Adapter (Протікаючий адаптер)
```typescript
// Погано - приховує важливі деталі
class LeakyAdapter {
  public request(): string {
    try {
      return this.adaptee.requestXML();
    } catch (error) {
      // Ігнорує помилки
      return 'default';
    }
  }
}
```

## Альтернативи

1. **Facade Pattern** - для спрощення складних інтерфейсів
2. **Decorator Pattern** - для додавання функціональності
3. **Proxy Pattern** - для контролю доступу
4. **Bridge Pattern** - для розділення абстракції та реалізації

## Висновок

Adapter - це потужний патерн для забезпечення сумісності несумісних інтерфейсів. Він особливо корисний при інтеграції з legacy кодом, третіми бібліотеками та різними API. Патерн забезпечує гнучкість та повторне використання коду, але потребує обережного проектування, щоб не створити складну систему адаптерів.
