// Public by default

class Greeter {
    static origin = {x: 0, y: 0};
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Greeter.origin.x);
        let yDist = (point.y - Greeter.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist);
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
///

class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
///

class Animal1 {
    private readonly name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal1 {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal1 {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal1 = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);

//// 

abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log("Department name: " + this.name);
    }

    abstract printMeeting(): void; // must be implemented in derived classes
}