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

const facade: Facade = new Facade();
facade.operation1();
facade.operation2();
