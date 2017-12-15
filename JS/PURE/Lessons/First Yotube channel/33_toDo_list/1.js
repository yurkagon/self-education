var toDoList = [];
if(localStorage.getItem("toDo") !== null){
	toDoList = JSON.parse(localStorage.getItem("toDo"));
	out();
} 



document.getElementById('add').onclick = function(){
	var input = document.getElementById('in').value;

	var temp = {};


	temp.toDo = input;
	temp.check = false;

	toDoList[toDoList.length] = temp;
	localStorage.setItem("toDo", JSON.stringify(toDoList));


	out();
}

function out(){
	var temp = "";

	for(key in toDoList){
		temp += "<input type = 'checkbox'";
		if(toDoList[key].check === true) temp += " checked>";
		else temp += ">";

		temp += toDoList[key].toDo + '<br>';
	}

	document.getElementById('out').innerHTML = temp;
}