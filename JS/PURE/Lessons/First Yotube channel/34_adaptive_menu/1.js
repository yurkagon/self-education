document.querySelector("#menu").onmouseover = showMenu;
document.querySelector("#menu").onmouseout = hideMenu;
document.querySelector("#menu").isOpen = false;
document.onkeypress = function(e){
	if(e.keyCode == 32){
		if(document.querySelector("#menu").isOpen === false){
			showMenu();
		} 
		else hideMenu();
	}
	document.querySelector("#menu").isOpen = !document.querySelector("#menu").isOpen;
}

function showMenu(){
	document.querySelector("#menu").style.left = 0;
}
function hideMenu(){
	document.querySelector("#menu").style.left = -240 + 'px';
}

