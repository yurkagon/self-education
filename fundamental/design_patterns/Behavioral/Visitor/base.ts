// Visitor Pattern - простий приклад

interface Element {
  accept(visitor: Visitor): void;
}

interface Visitor {
  visitElementA(element: ElementA): void;
  visitElementB(element: ElementB): void;
}

class ElementA implements Element {
  accept(visitor: Visitor): void {
    visitor.visitElementA(this);
  }
}

class ElementB implements Element {
  accept(visitor: Visitor): void {
    visitor.visitElementB(this);
  }
}

class ConcreteVisitor implements Visitor {
  visitElementA(element: ElementA): void {
    console.log('Visiting ElementA');
  }

  visitElementB(element: ElementB): void {
    console.log('Visiting ElementB');
  }
}

// Використання
const elementA = new ElementA();
const elementB = new ElementB();
const visitor = new ConcreteVisitor();

elementA.accept(visitor);
elementB.accept(visitor);
