# Порівняння Adapter, Decorator та Proxy

## Ключові відмінності

| Характеристика | Adapter | Decorator | Proxy |
|---------------|---------|-----------|-------|
| **Мета** | Змінює інтерфейс | Додає функціональність | Контролює доступ |
| **Інтерфейс** | Різний від оригінального | Той самий | Той самий |
| **Обгортання** | Один раз | Множинне | Один раз |
| **Використання** | Адаптація несумісних інтерфейсів | Розширення функціональності | Контроль доступу |

---

## Adapter (Адаптер)

### Мета
**Змінює інтерфейс** об'єкта, щоб зробити його сумісним з іншим інтерфейсом.

### Ключові особливості:
- ✅ **Змінює інтерфейс** - адаптер має інший інтерфейс, ніж оригінальний об'єкт
- ✅ **Адаптація** - перетворює виклики з одного формату в інший
- ✅ **Сумісність** - робить несумісні об'єкти сумісними

### Приклад:
```typescript
// Старий об'єкт з несумісним інтерфейсом
class OldAPI {
  getData(): string {
    return 'old format';
  }
}

// Новий інтерфейс
interface NewAPI {
  fetch(): Promise<string>;
}

// Adapter - змінює інтерфейс
class APIAdapter implements NewAPI {
  private oldAPI: OldAPI;
  
  constructor(oldAPI: OldAPI) {
    this.oldAPI = oldAPI;
  }
  
  async fetch(): Promise<string> {
    const data = this.oldAPI.getData(); // Перетворення
    return Promise.resolve(data);
  }
}

// Клієнт працює з новим інтерфейсом
const adapter = new APIAdapter(new OldAPI());
adapter.fetch(); // Тепер використовує новий інтерфейс
```

### Коли використовувати:
- Існуючий об'єкт з несумісним інтерфейсом
- Потрібно інтегрувати legacy код
- Треба адаптувати треті бібліотеки

---

## Decorator (Декоратор)

### Мета
**Додає функціональність** до об'єкта, не змінюючи його основну структуру.

### Ключові особливості:
- ✅ **Додає функціональність** - розширює поведінку об'єкта
- ✅ **Той самий інтерфейс** - декоратор має той самий інтерфейс
- ✅ **Множинне обгортання** - можна обгортати в кілька декораторів
- ✅ **Композиція** - комбінує різні функціональності

### Приклад:
```typescript
// Базовий інтерфейс
interface Component {
  operation(): string;
}

// Базовий компонент
class ConcreteComponent implements Component {
  operation(): string {
    return 'base';
  }
}

// Decorator - додає функціональність
class LoggingDecorator implements Component {
  private component: Component;
  
  constructor(component: Component) {
    this.component = component;
  }
  
  operation(): string {
    console.log('Before');
    const result = this.component.operation();
    console.log('After');
    return result;
  }
}

// Можна комбінувати декілька декораторів
let component: Component = new ConcreteComponent();
component = new LoggingDecorator(component);
component.operation(); // Додає логування
```

### Коли використовувати:
- Потрібно додати функціональність динамічно
- Хочете уникнути проблем з наслідуванням
- Потрібна гнучкість у комбінуванні функціональності

---

## Proxy (Проксі)

### Мета
**Контролює доступ** до об'єкта, замінюючи його або додаючи перевірки.

### Ключові особливості:
- ✅ **Контроль доступу** - перевіряє, чи можна виконати операцію
- ✅ **Той самий інтерфейс** - проксі має той самий інтерфейс
- ✅ **Заміна** - може замінювати справжній об'єкт
- ✅ **Ліниве завантаження** - створює об'єкт тільки при потребі

### Приклад:
```typescript
// Інтерфейс
interface Subject {
  request(): void;
}

// Справжній об'єкт
class RealSubject implements Subject {
  request(): void {
    console.log('Real operation');
  }
}

// Proxy - контролює доступ
class ProxySubject implements Subject {
  private realSubject: RealSubject | null = null;
  
  request(): void {
    // Перевірка перед доступом
    if (!this.hasAccess()) {
      throw new Error('Access denied');
    }
    
    // Ліниве створення
    if (!this.realSubject) {
      this.realSubject = new RealSubject();
    }
    
    // Виклик справжнього об'єкта
    this.realSubject.request();
  }
  
  private hasAccess(): boolean {
    return true; // Логіка перевірки
  }
}

// Клієнт працює з проксі
const proxy = new ProxySubject();
proxy.request(); // Контролюється доступом
```

### Коли використовувати:
- Потрібен контроль доступу
- Ліниве завантаження об'єктів
- Кешування результатів
- Валідація перед виконанням

---

## Візуальне порівняння

### Adapter
```
Клієнт → Adapter (новий інтерфейс) → OldObject (старий інтерфейс)
         [перетворює виклики]
```

### Decorator
```
Клієнт → Decorator1 → Decorator2 → BaseObject
         [додає логування] [додає кеш] [основна логіка]
```

### Proxy
```
Клієнт → Proxy → RealObject
         [контролює доступ] [справжній об'єкт]
```

---

## Практичне порівняння на прикладі файлу

### Adapter
```typescript
// Старий API повертає XML
class OldFileReader {
  readXML(): string { return '<data>...</data>'; }
}

// Новий інтерфейс очікує JSON
interface NewFileReader {
  readJSON(): string;
}

// Adapter - змінює формат
class FileAdapter implements NewFileReader {
  private oldReader: OldFileReader;
  
  readJSON(): string {
    const xml = this.oldReader.readXML();
    return this.convertToJSON(xml); // Перетворення
  }
}
```

### Decorator
```typescript
// Базовий файл
interface File {
  read(): string;
}

class TextFile implements File {
  read(): string { return 'file content'; }
}

// Decorator - додає функціональність
class CompressedFile implements File {
  private file: File;
  
  constructor(file: File) {
    this.file = file;
  }
  
  read(): string {
    const content = this.file.read();
    return this.decompress(content); // Додає функціональність
  }
}
```

### Proxy
```typescript
// Файл
interface File {
  read(): string;
}

class RealFile implements File {
  read(): string { return 'file content'; }
}

// Proxy - контролює доступ
class SecureFile implements File {
  private file: RealFile | null = null;
  
  read(): string {
    if (!this.checkPermission()) {
      throw new Error('No permission');
    }
    if (!this.file) {
      this.file = new RealFile(); // Ліниве завантаження
    }
    return this.file.read();
  }
}
```

---

## Швидка підказка

| Якщо потрібно... | Використовуйте... |
|------------------|-------------------|
| Змінити інтерфейс об'єкта | **Adapter** |
| Додати функціональність | **Decorator** |
| Контролювати доступ | **Proxy** |
| Інтегрувати legacy код | **Adapter** |
| Розширити поведінку | **Decorator** |
| Ліниве завантаження | **Proxy** |
| Адаптувати формат даних | **Adapter** |
| Кешувати результати | **Proxy** |
| Логування/моніторинг | **Decorator** або **Proxy** |

---

## Висновок

- **Adapter** = "Перетворити інтерфейс"
- **Decorator** = "Додати функціональність"  
- **Proxy** = "Контролювати доступ"

Всі три патерни використовують композицію та делегування, але мають різні мети та області застосування.
