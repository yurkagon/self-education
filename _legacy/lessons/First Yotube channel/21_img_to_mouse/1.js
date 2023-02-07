var isAdded = false; 
var cat;


document.onmousemove = function(event){
	//adding img to HTML
	if(!isAdded){
	 document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeEnd', '<img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/cat-48.png" id="cat">');
	 cat = document.getElementById('cat');

	 cat.style.position = 'fixed'; //coord element depends bowser window 
	 isAdded = true;
	}

	
	cat.style.left = event.clientX + "px";
	cat.style.top = event.clientY + "px";

}

