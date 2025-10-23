// Приклад Prototype патерну з графічними об'єктами

abstract class Shape {
  protected color: string;
  protected position: { x: number; y: number };
  protected size: number;

  constructor(color: string, position: { x: number; y: number }, size: number) {
    this.color = color;
    this.position = position;
    this.size = size;
  }

  // Абстрактний метод клонування
  abstract clone(): Shape;

  // Загальні методи
  public move(x: number, y: number): void {
    this.position.x += x;
    this.position.y += y;
  }

  public changeColor(color: string): void {
    this.color = color;
  }

  public resize(factor: number): void {
    this.size *= factor;
  }

  public getInfo(): string {
    return `Color: ${this.color}, Position: (${this.position.x}, ${this.position.y}), Size: ${this.size}`;
  }
}

// Конкретна реалізація - Коло
class Circle extends Shape {
  constructor(color: string, position: { x: number; y: number }, size: number) {
    super(color, position, size);
  }

  public clone(): Circle {
    // Глибоке клонування для об'єктів
    return new Circle(
      this.color,
      { x: this.position.x, y: this.position.y },
      this.size
    );
  }

  public draw(): void {
    console.log(`Drawing circle: ${this.getInfo()}`);
  }
}

// Конкретна реалізація - Прямокутник
class Rectangle extends Shape {
  private width: number;
  private height: number;

  constructor(
    color: string,
    position: { x: number; y: number },
    size: number,
    width: number,
    height: number
  ) {
    super(color, position, size);
    this.width = width;
    this.height = height;
  }

  public clone(): Rectangle {
    return new Rectangle(
      this.color,
      { x: this.position.x, y: this.position.y },
      this.size,
      this.width,
      this.height
    );
  }

  public draw(): void {
    console.log(`Drawing rectangle: ${this.getInfo()}, Width: ${this.width}, Height: ${this.height}`);
  }
}

// Приклад використання
const originalCircle = new Circle('red', { x: 10, y: 20 }, 50);
const clonedCircle = originalCircle.clone();

console.log('Original circle:', originalCircle.getInfo());
console.log('Cloned circle:', clonedCircle.getInfo());

// Модифікація клонованого об'єкта
clonedCircle.move(5, 5);
clonedCircle.changeColor('blue');
clonedCircle.resize(1.5);

console.log('Modified cloned circle:', clonedCircle.getInfo());
console.log('Original circle (unchanged):', originalCircle.getInfo());

// Приклад з прямокутником
const originalRect = new Rectangle('green', { x: 0, y: 0 }, 1, 100, 50);
const clonedRect = originalRect.clone();

clonedRect.move(10, 10);
clonedRect.changeColor('yellow');

console.log('Original rectangle:', originalRect.getInfo());
console.log('Cloned rectangle:', clonedRect.getInfo());
