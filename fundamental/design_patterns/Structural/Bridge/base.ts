export interface Color {
  draw(): void;
}
class Red implements Color {
  public draw(): void {
    console.log("red");
  }
}
class Blue implements Color {
  public draw(): void {
    console.log("blue");
  }
}

abstract class Shape {
  protected color: Color;

  constructor(color: Color) {
    this.color = color;
  }

  abstract callIt(): void;
}

class Circle extends Shape {
  public callIt(): void {
    console.log("This is Circle");
    this.color.draw();
  }
}
class Square extends Shape {
  public callIt(): void {
    console.log("This is Square");
    this.color.draw();
  }
}

const red = new Red();
const shape = new Circle(red);
shape.callIt();
