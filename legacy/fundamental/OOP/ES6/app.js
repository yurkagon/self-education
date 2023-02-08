class Human{
	constructor(name = "no name"){
		this._name = name;
	}

	get name(){
		return this._name;
	}
	set name(name){
		this._name = name;
	}

	static createFunnyHuman(){
		return new Human("cpt. John Price");
	}

	toString(){
		return `Human with name ${this._name} .`;
	}
}
var a = new Human();
a.name = "Yuragon4eg";
console.log(a.name); //Yuragon4eg

var b = Human.createFunnyHuman();
console.log(b.name); //cpt. John Price
alert(b); //to string works  'Human with name cpt. John Price .'

//extending
class Programmer extends Human{
	constructor(name = "No name", age = 18){
		super(name);
		this.age = age;
	}
	toString(){
		//calling parrent methods
		return super.toString() + "I am programmer :) \nI am " + this.age + " years old.";
	}
}

var c = new Programmer("Yura");
alert(c);
