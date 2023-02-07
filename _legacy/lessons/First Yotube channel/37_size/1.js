window.onload = function(){
	var left = document.querySelector(".left");
    var right = document.querySelector(".right");

function resize(){
	left.style.height = "auto";
	right.style.height = "auto";

	var offsetLeft = left.offsetHeight;
	var offsetRight = right.offsetHeight;


	var max = Math.max(offsetLeft,offsetRight);



	
	left.style.height = max + "px";
	right.style.height = max + "px";
}

resize();
window.onresize = resize;
}

