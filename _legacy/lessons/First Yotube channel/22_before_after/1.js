document.getElementById("myslide").onmousemove = function(event){
	var x = event.offsetX; //otnositelno roditela
	var y = event.offsetY;

	document.getElementById('two').style.width = x + 'px';
	//console.log('x =' + x + 'y = ' + y);
}

document.getElementById("myslide").onmouseleave = function(event){
	document.getElementById('two').style.width = '100%';
}