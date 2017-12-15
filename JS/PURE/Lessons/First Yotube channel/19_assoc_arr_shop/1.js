var goods = {
	"1488" : {
		"name" : "Banana",
		"weight" : 0.1,
		"cost" : 20,
		"img" : "https://cdn2.iconfinder.com/data/icons/shiny-fruits/100/bananas-3-128.png",
		"storage" : "yes"
	},
	"228" : {
		"name" : "Apple",
		"weight" : 0.05,
		"cost" : 8,
		"img" : "https://cdn3.iconfinder.com/data/icons/fruits-8/512/apple-128.png",
		"storage" : "no"
	}
}


var out='';

for (key in goods){
	out += "Name - " + goods[key].name + "<br>";
	out += "Price - " + goods[key].cost + "$ <br>";
	out += "Weight - " + goods[key].weight + "kg <br>";

	out += "<img src='" + goods[key].img + "'> <hr>";
}

document.getElementById('out').innerHTML = out;

