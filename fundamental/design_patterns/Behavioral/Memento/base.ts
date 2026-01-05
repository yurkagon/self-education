// Memento Pattern - простий приклад

class Memento {
  constructor(private state: string) {}

  getState(): string {
    return this.state;
  }
}

class Originator {
  private state: string = '';

  setState(state: string): void {
    this.state = state;
  }

  getState(): string {
    return this.state;
  }

  save(): Memento {
    return new Memento(this.state);
  }

  restore(memento: Memento): void {
    this.state = memento.getState();
  }
}

class Caretaker {
  private mementos: Memento[] = [];

  addMemento(memento: Memento): void {
    this.mementos.push(memento);
  }

  getMemento(index: number): Memento {
    return this.mementos[index];
  }
}

// Використання
const originator = new Originator();
const caretaker = new Caretaker();

originator.setState('State 1');
caretaker.addMemento(originator.save());

originator.setState('State 2');
caretaker.addMemento(originator.save());

originator.restore(caretaker.getMemento(0));
console.log(originator.getState()); // State 1
