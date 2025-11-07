# Патерн State (Стан)

Плеєр заблокований або розблоковани стан, клас стану логіки кнопок

## Опис

State - це патерн поведінки, який дозволяє об'єкту змінювати свою поведінку, коли змінюється його внутрішній стан. Об'єкт здається, ніби він змінив свій клас.

## Основні принципи

- **Зміна поведінки**: Об'єкт змінює поведінку залежно від стану
- **Інкапсуляція стану**: Кожен стан - окремий клас
- **Переходи**: Об'єкт може переходити між станами
- **Поліморфізм**: Різні стани мають різну поведінку
- **Гнучкість**: Легко додавати нові стани

## Переваги

- ✅ Інкапсулює поведінку стану в окремі класи
- ✅ Уникає великих if/switch конструкцій
- ✅ Легко додавати нові стани
- ✅ Підтримує принцип відкритості/закритості
- ✅ Покращує читабельність коду
- ✅ Спрощує тестування

## Недоліки

- ❌ Може призвести до великої кількості класів
- ❌ Складність у налагодженні
- ❌ Може бути надмірним для простих випадків
- ❌ Потенційні проблеми з продуктивністю
- ❌ Складність у розумінні

## Коли використовувати

- Коли об'єкт має багато станів з різною поведінкою
- Коли хочете уникнути великих if/switch конструкцій
- Коли поведінка залежить від стану
- Коли потрібна гнучкість у зміні станів
- Коли хочете інкапсулювати логіку стану

## Структура патерну

### Компоненти

1. **Context** - контекст (об'єкт зі станом)
2. **State** - абстрактний стан
3. **ConcreteState** - конкретні стани
4. **Client** - клієнт

## Реалізація (base.ts)

### Аналіз коду

#### 1. Абстрактний стан (PlayerState)
```typescript
abstract class PlayerState {
  protected player: Player;

  constructor(player: Player) {
    this.player = player;
  }

  public abstract play(): void;
  public abstract stop(): void;
}
```

**Особливості:**
- **Абстрактний клас**: Визначає інтерфейс для всіх станів
- **Посилання**: Містить посилання на контекст
- **Абстрактні методи**: Кожен стан має свою реалізацію

#### 2. Конкретні стани
```typescript
class LockedPlayerState extends PlayerState {
  public play() {
    this.showUnlockDeviceMessage();
  }

  public stop() {
    this.showUnlockDeviceMessage();
  }
}

class UnlockedPlayerState extends PlayerState {
  play() {
    this.player.isPlaying = true;
  }

  stop() {
    this.player.isPlaying = false;
  }
}
```

**Особливості:**
- **Різна поведінка**: Кожен стан має свою поведінку
- **LockedPlayerState**: Блокує операції, показує повідомлення
- **UnlockedPlayerState**: Дозволяє операції, змінює стан плеєра
- **Спеціалізація**: Кожен стан знає, що робити

#### 3. Context (Player)
```typescript
class Player {
  public isPlaying = false;
  private state: PlayerState;

  constructor() {
    this.setState(UnlockedPlayerState);
  }

  public setState(State: new(player: Player) => PlayerState) {
    this.state = new State(this);
  }

  public play() {
    this.state.play();
  }

  public stop() {
    this.state.stop();
  }
}
```

**Особливості:**
- **Делегування**: Делегує виклики поточному стану
- **Зміна стану**: Може змінювати стан через setState()
- **Прозорість**: Клієнт не знає про конкретний стан
- **Ініціалізація**: Починає з UnlockedPlayerState

#### 4. Використання
```typescript
const p = new Player();
p.play(); // isPlaying = true
p.setState(LockedPlayerState);
p.play(); // Unlock your player
```

**Особливості:**
- **Зміна поведінки**: Поведінка змінюється при зміні стану
- **Прозорість**: Клієнт викликає ті самі методи
- **Гнучкість**: Легко змінювати стани

## Типи State патернів

### 1. Simple State (Простий стан)
- Базові переходи між станами
- Мінімальна логіка
- Найпростіший варіант

### 2. State Machine (Машина станів)
- Складні переходи між станами
- Валідація переходів
- Більше контролю

### 3. Hierarchical State (Ієрархічний стан)
- Вкладені стани
- Наслідування поведінки
- Складніша структура

## Приклади використання

### 1. Документ
```typescript
class Document {
  private state: DocumentState;

  publish(): void {
    this.state.publish();
  }

  setState(state: DocumentState): void {
    this.state = state;
  }
}

class DraftState implements DocumentState {
  publish(): void {
    console.log('Moving to Published');
  }
}

class PublishedState implements DocumentState {
  publish(): void {
    console.log('Already published');
  }
}
```

### 2. Замовлення
```typescript
class Order {
  private state: OrderState;

  ship(): void {
    this.state.ship();
  }
}

class PendingState implements OrderState {
  ship(): void {
    // Перехід до ShippedState
  }
}

class ShippedState implements OrderState {
  ship(): void {
    console.log('Already shipped');
  }
}
```

### 3. UI компонент
```typescript
class Button {
  private state: ButtonState;

  click(): void {
    this.state.click();
  }
}

class EnabledState implements ButtonState {
  click(): void {
    // Виконання дії
  }
}

class DisabledState implements ButtonState {
  click(): void {
    // Нічого не робить
  }
}
```

## Розширення функціональності

### Додавання переходів
```typescript
class PlayerState {
  canTransitionTo(newState: PlayerState): boolean {
    // Логіка валідації переходу
    return true;
  }
}
```

### Додавання подій
```typescript
class PlayerState {
  onEnter(): void {
    console.log('Entering state');
  }

  onExit(): void {
    console.log('Exiting state');
  }
}
```

### Додавання історії
```typescript
class Player {
  private stateHistory: PlayerState[] = [];

  setState(state: PlayerState): void {
    this.stateHistory.push(this.state);
    this.state = state;
  }

  getPreviousState(): PlayerState {
    return this.stateHistory.pop();
  }
}
```

## Порівняння з іншими патернами

### State vs Strategy
- **State**: Змінює поведінку залежно від стану
- **Strategy**: Змінює алгоритм виконання

### State vs Command
- **State**: Змінює поведінку об'єкта
- **Command**: Інкапсулює запит як об'єкт

### State vs Bridge
- **State**: Змінює поведінку об'єкта
- **Bridge**: Розділяє абстракцію від імплементації

## Альтернативи

1. **if/switch statements** - для простих випадків
2. **State Machine Library** - для складних машин станів
3. **Enum + Methods** - для простих станів
4. **Flags** - для булевих станів

## Висновок

State - це потужний патерн для управління поведінкою об'єкта залежно від його стану. Він особливо корисний для об'єктів з багатьма станами та складною логікою переходів, але може бути надмірним для простих випадків з невеликою кількістю станів.
