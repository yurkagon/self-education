# Патерн Flyweight (Легковаговик)

## Опис

Flyweight - це структурний патерн проектування, який дозволяє ефективно використовувати пам'ять шляхом розділення спільних даних між багатьма об'єктами. Патерн зберігає спільні дані (intrinsic state) в одному місці та передає унікальні дані (extrinsic state) як параметри.

## Основні принципи

- **Розділення стану**: Intrinsic (спільний) та Extrinsic (унікальний) стан
- **Кешування**: Зберігання спільних об'єктів в кеші
- **Оптимізація пам'яті**: Зменшення використання пам'яті
- **Повторне використання**: Використання одного об'єкта для багатьох контекстів
- **Фабричний метод**: Створення та кешування flyweight об'єктів

## Переваги

- ✅ Значне зменшення використання пам'яті
- ✅ Покращення продуктивності
- ✅ Ефективне використання ресурсів
- ✅ Масштабованість для великих кількостей об'єктів
- ✅ Оптимізація для громістких даних

## Недоліки

- ❌ Складність реалізації
- ❌ Потенційні проблеми з потокобезпекою
- ❌ Складність у налагодженні
- ❌ Може призвести до плутанини в коді
- ❌ Не завжди потрібен для простих випадків

## Коли використовувати

- Коли є багато об'єктів з однаковими даними
- Коли пам'ять є обмеженим ресурсом
- Коли об'єкти містять громісткі дані (зображення, шрифти, текстури)
- Коли потрібна оптимізація продуктивності
- Коли є повторювані елементи в UI

## Структура патерну

### Компоненти

1. **Flyweight** - спільні дані (intrinsic state)
2. **Context** - унікальні дані (extrinsic state)
3. **Flyweight Factory** - створення та кешування flyweight
4. **Client** - використання flyweight об'єктів

## Реалізація (base.ts)

### Аналіз коду

#### 1. Flyweight клас
```typescript
class ImageFlyweight {
  private static cache: Map<string, ImageFlyweight> = new Map();
  
  // Громісткі дані - base64 картинки
  private readonly base64Data: string;
  private readonly width: number;
  private readonly height: number;
  private readonly format: string;
}
```

**Особливості:**
- **Статичний кеш**: Зберігає всі створені flyweight об'єкти
- **Громісткі дані**: base64 картинки, шрифти, текстури
- **Незмінність**: Дані не змінюються після створення
- **Кешування**: Перевіряє наявність перед створенням

#### 2. Фабричний метод
```typescript
public static getImage(key: string, base64Data: string, width: number, height: number, format: string): ImageFlyweight {
  if (!ImageFlyweight.cache.has(key)) {
    console.log(`Creating new flyweight for key: ${key}`);
    ImageFlyweight.cache.set(key, new ImageFlyweight(base64Data, width, height, format));
  } else {
    console.log(`Reusing existing flyweight for key: ${key}`);
  }
  return ImageFlyweight.cache.get(key)!;
}
```

**Особливості:**
- **Перевірка кешу**: Спочатку шукає в кеші
- **Створення при потребі**: Створює тільки якщо немає в кеші
- **Повторне використання**: Повертає існуючий об'єкт
- **Ключ кешування**: Унікальний ідентифікатор

#### 3. Context клас
```typescript
class ImageContext {
  private x: number;
  private y: number;
  private scale: number;
  private rotation: number;
  private flyweight: ImageFlyweight;
}
```

**Особливості:**
- **Унікальні дані**: Позиція, масштаб, обертання
- **Посилання на flyweight**: Не копіює громісткі дані
- **Контекст**: Містить стан для конкретного використання

## Типи Flyweight патернів

### 1. Simple Flyweight (Простий)
- Один flyweight клас
- Простий кеш
- Мінімальна функціональність

### 2. Complex Flyweight (Складний)
- Кілька flyweight класів
- Складний кеш
- Розширена функціональність

### 3. Hierarchical Flyweight (Ієрархічний)
- Вкладена структура flyweight
- Багаторівневий кеш
- Складні залежності

## Приклади використання

### 1. Графічні об'єкти (base.ts)
- **Flyweight**: base64 картинки
- **Context**: позиція, масштаб, обертання
- **Перевага**: Одна картинка для багатьох об'єктів

### 2. Текстовий редактор (text-editor.ts)
- **Flyweight**: шрифтові файли
- **Context**: символ, розмір, колір, позиція
- **Перевага**: Один шрифт для багатьох символів

### 3. Ігрові об'єкти (game-objects.ts)
- **Flyweight**: текстури
- **Context**: позиція, масштаб, обертання
- **Перевага**: Одна текстура для багатьох об'єктів

## Розширення функціональності

### Додавання LRU кешу
```typescript
class LRUFlyweight {
  private static cache: Map<string, { flyweight: any; lastUsed: number }> = new Map();
  private static maxSize: number = 100;

  public static get(key: string): any {
    if (this.cache.has(key)) {
      const entry = this.cache.get(key)!;
      entry.lastUsed = Date.now();
      return entry.flyweight;
    }
    return null;
  }

  public static set(key: string, flyweight: any): void {
    if (this.cache.size >= this.maxSize) {
      this.evictLeastRecentlyUsed();
    }
    this.cache.set(key, { flyweight, lastUsed: Date.now() });
  }

  private static evictLeastRecentlyUsed(): void {
    let oldestKey = '';
    let oldestTime = Date.now();
    
    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastUsed < oldestTime) {
        oldestTime = entry.lastUsed;
        oldestKey = key;
      }
    }
    
    this.cache.delete(oldestKey);
  }
}
```

### Додавання статистики
```typescript
class FlyweightStats {
  private static stats: Map<string, { hits: number; misses: number }> = new Map();

  public static recordHit(key: string): void {
    if (!this.stats.has(key)) {
      this.stats.set(key, { hits: 0, misses: 0 });
    }
    this.stats.get(key)!.hits++;
  }

  public static recordMiss(key: string): void {
    if (!this.stats.has(key)) {
      this.stats.set(key, { hits: 0, misses: 0 });
    }
    this.stats.get(key)!.misses++;
  }

  public static getStats(): Map<string, { hits: number; misses: number; hitRate: number }> {
    const result = new Map();
    for (const [key, stats] of this.stats.entries()) {
      const total = stats.hits + stats.misses;
      result.set(key, {
        ...stats,
        hitRate: total > 0 ? stats.hits / total : 0
      });
    }
    return result;
  }
}
```

## Порівняння з іншими патернами

### Flyweight vs Singleton
- **Flyweight**: Багато екземплярів, спільні дані
- **Singleton**: Один екземпляр, унікальні дані

### Flyweight vs Prototype
- **Flyweight**: Кешування, оптимізація пам'яті
- **Prototype**: Клонування, створення копій

### Flyweight vs Factory
- **Flyweight**: Кешування створених об'єктів
- **Factory**: Створення нових об'єктів

## Антипатерни

### 1. Premature Optimization (Передчасна оптимізація)
```typescript
// Погано - використання flyweight для простих об'єктів
class SimpleFlyweight {
  private static cache: Map<string, SimpleFlyweight> = new Map();
  private data: string; // Простий рядок
}
```

### 2. Memory Leak (Витік пам'яті)
```typescript
// Погано - кеш ніколи не очищується
class LeakyFlyweight {
  private static cache: Map<string, any> = new Map();
  // Немає методу очищення кешу
}
```

## Альтернативи

1. **Object Pool** - для перевикористання об'єктів
2. **Caching** - для кешування результатів
3. **Lazy Loading** - для відкладного завантаження
4. **Compression** - для стиснення даних

## Висновок

Flyweight - це потужний патерн для оптимізації пам'яті, особливо корисний для роботи з громісткими даними та великими кількостями об'єктів. Він особливо ефективний для графічних додатків, ігор та текстових редакторів, де багато об'єктів мають спільні дані. Патерн забезпечує значну економію пам'яті, але потребує обережного проектування та тестування.
