// Interpreter Pattern - простий приклад

interface Expression {
  interpret(): number;
}

class NumberExpression implements Expression {
  constructor(private value: number) {}

  interpret(): number {
    return this.value;
  }
}

class AddExpression implements Expression {
  constructor(
    private left: Expression,
    private right: Expression
  ) {}

  interpret(): number {
    return this.left.interpret() + this.right.interpret();
  }
}

// Використання
const expression = new AddExpression(
  new NumberExpression(5),
  new NumberExpression(3)
);

console.log(expression.interpret()); // 8
