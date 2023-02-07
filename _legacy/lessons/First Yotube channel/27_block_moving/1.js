var block = document.getElementById('block');
var speed = 20;
var x = 0, y = 0;

//to set starting position
block.style.top = y + 'px';
block.style.left = x + 'px';

document.onkeydown = function(e){
  
	if (e.keyCode == 38 && y > 0) y -= speed; //up
	if (e.keyCode == 40 && y < window.innerHeight - 100) y += speed; //down
	if (e.keyCode == 37 && x > 0) x -= speed; //left
	if (e.keyCode == 39 && x < window.innerWidth - 100) x += speed; //right




	block.style.top = y + 'px';
	block.style.left = x + 'px';

	console.log(x + ' - ' + y);
		
		

	
}