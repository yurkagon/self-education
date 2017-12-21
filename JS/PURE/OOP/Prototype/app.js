//First class
//Constructor
function Human(name, age){
	this._name = name;
	this._age = age;
}
//setter getter
Human.prototype.name = function(name){
	if(!arguments.length) return this._name;
	else this._name = name;
}
Human.prototype.age = function(age){
	if(!arguments.length) return this._age;
	else this._age = age;
}
//method
Human.prototype.sayHi = function(){
	alert('I am a Human. Soo...Hi!');
}

var a = new Human("test",21);
a.name("Sasha");
console.log(a.name());
a.sayHi();


//Second class
function Programmer(name, age, lang){
	Human.apply(this, arguments);
	this._name = name;
	this._age = age;
	this._lang = lang;
}
//exnending
Programmer.prototype = Object.create(Human.prototype);
Programmer.prototype.constructor = Programmer;
//override
Programmer.prototype.sayHi = function(argument){
	alert('I am a Human and I am Programmer. Soo...Hi!');
};

var b = new Programmer("Yura",25,'Js');

b.sayHi();