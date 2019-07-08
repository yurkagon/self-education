interface Component {
  name?: string;
  operation(): string;
}

class SomeComponent implements Component {
  public name = 'some component';

  public operation() {
    return this.name;
  }
}

class ComponentDecorator implements Component {
  private component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  public operation() {
    const str = this.component.operation();
    console.log(str);

    return str;
  }
}
