var sayMixin = {
	sayHi: function () {
		alert("Hi, my name is " + this.name);
	},
	sayBye: function(){
		alert("Bye!");
	},
	Pi: 3.14
}

function Human(name){
	this.name = name;
}
for(key in sayMixin) Human.prototype[key] = sayMixin[key];

var Iam = new Human("Yura");

Iam.sayHi();
Iam.sayBye();
alert(Iam.Pi);