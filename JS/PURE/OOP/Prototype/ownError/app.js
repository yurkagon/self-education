function badNumberError(i){
	Error.apply(this,arguments);
	this.property = i;
	this.message = "Bad number: " + i;
}
badNumberError.prototype = Object.create(Error.prototype);

try {
	var a = 0;
	if(a < 0)  throw new badNumberError(a);
	else if (a == 0) throw new Error("is zero");
} catch(err) {
	alert(err.message);
}

