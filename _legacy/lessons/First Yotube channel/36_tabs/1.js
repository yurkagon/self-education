var tubs_body = document.getElementsByClassName("tubs-body");

var tubs_buttons = document.getElementsByClassName("tubs_buttons");
for(var key in tubs_buttons){
	tubs_buttons[key].onclick = tab_button;
}


function tab_button(event){
	var index = this.innerHTML - 1;

	for(let i = 0; i < tubs_buttons.length; i++){
		if(i != index) tubs_body[i].style.display = "none";
		else tubs_body[i].style.display = "block";
	}
}

console.log(navigator);