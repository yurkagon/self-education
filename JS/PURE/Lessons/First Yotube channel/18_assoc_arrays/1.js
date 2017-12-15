var human = {
	"name" : "Yura",
	"age" : 21,
	"id" : 1488, 
	"sex" : "male",
	"year" : function () {
		return 2017 - this.age;
	}
}

//console.log(human);
//console.log(human.name);
//console.log(human['age']);
var a = 'id';
//console.log(human[a]);

//console.log(human.year());

//console.log("SECOND TASK!!!!");


var array = {
	"arr" : [1,1,1,1,1,1,1],
	"sum" : function(){
		var sum = 0;
		for(var i = 0; i < this.arr.length; i++) sum += this.arr[i];
		return sum;
	}
}

//console.log(array.sum());

document.onwheel = function(e){
	console.log(e);
}