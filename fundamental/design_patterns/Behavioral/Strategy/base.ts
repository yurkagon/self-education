interface Strategy {
  execute(): void;
}

class Strategy1 implements Strategy {
  public execute(): void {
    console.log("`execute` method of Strategy1 is being called");
  }
}
class Strategy2 implements Strategy {
  public execute(): void {
    console.log("`execute` method of Strategy2 is being called");
  }
}

class Context {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.setStrategy(strategy);
  }

  public executeStrategy(): void {
    this.strategy.execute();
  }

  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }
}

const context: Context = new Context(new Strategy1());
context.executeStrategy();

context.setStrategy(new Strategy2());
context.executeStrategy();
