export interface IColor {
  draw(): void;
}

abstract class Shape {
  protected color: IColor;

  constructor(color: IColor) {
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


export class Red implements IColor {
  public draw() : void {
    console.log("red");
  }
}
export class Blue implements IColor {
  public draw() : void {
    console.log("blue");
  }
}

const red = new Red();
const shape = new Circle(red);
shape.callIt();
