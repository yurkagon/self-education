interface Button {
  render(): void
}
class WindowsButton implements Button {
  render() {
    console.log('Windows Button')
  }
}
class MacButton implements Button {
  render() {
    console.log('Mac Button')
  }
}

interface Checkbox {
  render(): void
}
class WindowsCheckbox implements Checkbox {
  render() {
    console.log('Windows Checkbox')
  }
}
class MacCheckbox implements Checkbox {
  render() {
    console.log('Mac Checkbox')
  }
}

interface GUIFactory {
  createButton(): Button
  createCheckbox(): Checkbox
}
class WindowsGUIFactory implements GUIFactory {
  createButton() {
    return new WindowsButton();
  }
  createCheckbox() {
    return new WindowsCheckbox();
  }
}
class MacGUIFactory implements GUIFactory {
  createButton() {
    return new MacButton();
  }
  createCheckbox() {
    return new MacCheckbox();
  }
}

const render = (factory: GUIFactory) => {
  factory.createButton();
  factory.createCheckbox();
}

render(new WindowsGUIFactory());
render(new MacGUIFactory());
