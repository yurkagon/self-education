class Singleton {
	constructor() {
		if (Singleton.instance) {
       return Singleton.instance;
    }
    Singleton.instance = this;

    this.name = 'some name';
  }
}

const instance1 = new Singleton();
const instance2 = new Singleton();

console.log(instance1 === instance2)
console.log(instance2.name)
