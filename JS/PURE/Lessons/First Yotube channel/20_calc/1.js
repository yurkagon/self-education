var screen = document.getElementById("screen"); 
var first,second,type;

var d1 = document.getElementById("d1");
var d2 = document.getElementById("d2");
var d3 = document.getElementById("d3");
var d4 = document.getElementById("d4");
var d5 = document.getElementById("d5");
var d6 = document.getElementById("d6");
var d7 = document.getElementById("d7");
var d8 = document.getElementById("d8");
var d9 = document.getElementById("d9");
var d0 = document.getElementById("d0");
function digit_button(){
	if (screen.innerHTML == "0") screen.innerHTML = "";
	if(screen.innerHTML.length < 14) screen.innerHTML += event.srcElement.value;
}

var mult = document.getElementById("mult");
var dev = document.getElementById("dev");
var min = document.getElementById("min");
var plus = document.getElementById("plus");
function type_button(){
	first = screen.innerHTML;
	type = event.srcElement.id;
	screen.innerHTML = "";
}


var eq = document.getElementById("eq");
eq.onclick = function (){
	second = screen.innerHTML;
	var result;
	
	if(type == "min") result = parseFloat(first) - parseFloat(second);
	if(type == "plus") result = parseFloat(first) + parseFloat(second);
	if(type == "mult") result = first * second;
	if(type == "dev") result = first / second;

	screen.innerHTML = result;
}

var reset = document.getElementById("reset");
reset.onclick = function (){
	screen.innerHTML = "0";
	first = 0;
	second = 0;
}

var sq = document.getElementById("sq");
sq.onclick = function(){
	var t = parseFloat(screen.innerHTML);
	screen.innerHTML = Math.sqrt(t);
}





var point = document.getElementById("point");
point.onclick = function(){
	if (screen.innerHTML == "") screen.innerHTML = "0.";
	var t = screen.innerHTML.indexOf('.');

	if (t == -1 ) screen.innerHTML += '.';
}




















