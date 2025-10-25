// Decorator Pattern - кав'ярня з різними добавками

// Базовий інтерфейс для кави
interface Coffee {
  getDescription(): string;
  getCost(): number;
}

// Базова кава
class SimpleCoffee implements Coffee {
  public getDescription(): string {
    return 'Simple coffee';
  }

  public getCost(): number {
    return 10;
  }
}

// Базовий декоратор
abstract class CoffeeDecorator implements Coffee {
  protected coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  public abstract getDescription(): string;
  public abstract getCost(): number;
}

// Конкретний декоратор
class MilkDecorator extends CoffeeDecorator {
  public getDescription(): string {
    return this.coffee.getDescription() + ', milk';
  }

  public getCost(): number {
    return this.coffee.getCost() + 2;
  }
}

// Кав'ярня
class CoffeeShop {
  public createCoffee(): Coffee {
    return new SimpleCoffee();
  }

  public createLatte(): Coffee {
    return new MilkDecorator(new SimpleCoffee());
  }

  public createDoubleLatte(): Coffee {
    return new MilkDecorator(new MilkDecorator(new SimpleCoffee()));
  }
}

// Приклад використання
console.log('=== Coffee Shop Decorator Demo ===');

const coffeeShop = new CoffeeShop();

// Створення різних видів кави
const simpleCoffee = coffeeShop.createCoffee();
const latte = coffeeShop.createLatte();
const doubleLatte = coffeeShop.createDoubleLatte();

// Виведення інформації про каву
console.log('\n=== Coffee Menu ===');
console.log(`${simpleCoffee.getDescription()} - $${simpleCoffee.getCost()}`);
console.log(`${latte.getDescription()} - $${latte.getCost()}`);
console.log(`${doubleLatte.getDescription()} - $${doubleLatte.getCost()}`);

// Демонстрація ланцюжкового додавання
console.log('\n=== Building Coffee Step by Step ===');
let myCoffee: Coffee = new SimpleCoffee();
console.log(`Step 1: ${myCoffee.getDescription()} - $${myCoffee.getCost()}`);

myCoffee = new MilkDecorator(myCoffee);
console.log(`Step 2: ${myCoffee.getDescription()} - $${myCoffee.getCost()}`);

myCoffee = new MilkDecorator(myCoffee);
console.log(`Final: ${myCoffee.getDescription()} - $${myCoffee.getCost()}`);
