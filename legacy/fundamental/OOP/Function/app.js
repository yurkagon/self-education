function Human(name){
	this._id = 0; //private
	var something; //also private, but doesnt work ind extends
	this.name = name;

	var self = this;


	//getter and setter (public method)
	this.id = function(ID){
		if(!arguments.length) return this._id;
		else if (arguments.length > 1) throw new Error("Must be just one ID argument");
		else this._id = ID;

		//alert(getName());
	}

	//private method
	var getName = function(){
		return self.name; //get public value from private method, this doesnt work
		//return this.name;
		/* Also works, but if "bind(this)" 
		and function is like "var getName = function(){}" */
	}.bind(this);


	this.run = function(){
		alert('The human ' + this.name + ' is running');
	}
}

var a = new Human('aaa');
a.id(1487);
console.log(a.id());
a.run();

//extending
function Programmer(name, lang){
	Human.call(this, name); //extends Human
	//Human.apply(this, arguments); //works with more arguments
	//console.log(this.name); works
	this.lang = lang;
	
	//override
	var parentRun = this.run;
	this.run = function(){
		//parentRun.call(this); // parents commands in overrided method
		alert('The programmer ' + this.name + ' is running');
	}
}

var b = new Programmer('Yura','JS');
b.id(1489);
console.log(b.id());
b.run();

