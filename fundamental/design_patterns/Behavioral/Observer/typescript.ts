class Publisher {
  private observers: Subscriber[] = [];

  public register(observer: Subscriber): void {
    this.observers.push(observer);
  }

  public unregister(observer: Subscriber): void {
    const n: number = this.observers.indexOf(observer);
    this.observers.splice(n, 1);
  }

  public notify(): void {
    for (let i = 0; i < this.observers.length; i++) {
      this.observers[i].notify(i);
    }
  }
}

class Subscriber {
  private name: string;
  private state: number;

  constructor (name: string) {
    this.name = name;
  }

  public notify(message: number): void {
    this.state = message;
  }
}
