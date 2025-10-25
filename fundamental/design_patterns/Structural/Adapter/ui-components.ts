// Adapter Pattern - адаптація UI компонентів (спрощений приклад)

// Старий UI компонент (jQuery-подібний)
class OldButton {
  private element: HTMLElement;

  constructor(selector: string) {
    this.element = document.querySelector(selector) as HTMLElement;
  }

  public click(): void {
    console.log('Old Button: Clicked');
    this.element.click();
  }

  public setText(text: string): void {
    this.element.textContent = text;
  }

  public setVisible(visible: boolean): void {
    this.element.style.display = visible ? 'block' : 'none';
  }

  public getText(): string {
    return this.element.textContent || '';
  }
}

// Сучасний UI інтерфейс
interface ModernButton {
  onClick(callback: () => void): void;
  setText(text: string): void;
  setVisible(visible: boolean): void;
  getText(): string;
}

// Адаптер для кнопки
class ButtonAdapter implements ModernButton {
  private oldButton: OldButton;
  private clickCallbacks: (() => void)[] = [];

  constructor(oldButton: OldButton) {
    this.oldButton = oldButton;
    this.setupEventHandling();
  }

  public onClick(callback: () => void): void {
    this.clickCallbacks.push(callback);
  }

  public setText(text: string): void {
    this.oldButton.setText(text);
  }

  public setVisible(visible: boolean): void {
    this.oldButton.setVisible(visible);
  }

  public getText(): string {
    return this.oldButton.getText();
  }

  private setupEventHandling(): void {
    // Симуляція обробки подій для старого компонента
    setInterval(() => {
      if (Math.random() < 0.1) { // 10% шанс на клік
        this.handleClick();
      }
    }, 1000);
  }

  private handleClick(): void {
    this.oldButton.click();
    this.clickCallbacks.forEach(callback => callback());
  }
}

// Сучасний UI менеджер
class UIManager {
  private buttons: Map<string, ModernButton> = new Map();

  public addButton(id: string, button: ModernButton): void {
    this.buttons.set(id, button);
  }

  public getButton(id: string): ModernButton | undefined {
    return this.buttons.get(id);
  }

  public setupInteractions(): void {
    // Налаштування взаємодії з кнопкою
    const submitButton = this.getButton('submit');

    if (submitButton) {
      submitButton.onClick(() => {
        console.log('Form submitted successfully!');
      });
    }
  }
}

// Приклад використання
console.log('=== UI Components Adapter Demo ===');

// Створення старого компонента (симуляція)
const oldSubmitButton = new OldButton('#submit-btn');

// Створення адаптера
const submitButtonAdapter = new ButtonAdapter(oldSubmitButton);

// Створення UI менеджера
const uiManager = new UIManager();

// Додавання адаптованого компонента
uiManager.addButton('submit', submitButtonAdapter);

// Налаштування взаємодії
uiManager.setupInteractions();

// Налаштування кнопки
const submitButton = uiManager.getButton('submit');

if (submitButton) {
  submitButton.setText('Submit Form');
  submitButton.setVisible(true);
}

console.log('\n=== UI Components Ready ===');
console.log('Submit button text:', submitButton?.getText());

// Демонстрація роботи
setTimeout(() => {
  console.log('\n=== Simulating User Interaction ===');
  console.log('Button is ready to be clicked...');
}, 2000);
