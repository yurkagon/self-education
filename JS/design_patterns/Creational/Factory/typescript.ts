abstract class Animal {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  public abstract sayName(): void;
}
class Dog extends Animal {
  public sayName(): void {
    console.log(`The dog name is ${this.name}`);
  }
}
class Cat extends Animal {
  public sayName(): void {
    console.log(`The dog name is ${this.name}`);
  }
}

interface IAnimalConfig {
  type: string;
  name: string;
};



class AnimalFactory {
  public static readonly animalTypes = {
    cat: Cat,
    dog: Dog
  };

  public static createAnimal(config: IAnimalConfig): Animal {
    const { type, name } = config;

    const AnimalClass = AnimalFactory.animalTypes[type];

    return new AnimalClass(name);
  }
}

const dog = AnimalFactory.createAnimal({ type: 'dog', name: 'Hachiko' });
const cat = AnimalFactory.createAnimal({ type: 'cat', name: 'Some cat' });

