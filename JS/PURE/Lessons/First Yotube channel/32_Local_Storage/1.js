window.onload = function(){
	if(localStorage.getItem('bgColor') !== null){
		document.getElementsByTagName('body')[0].style.background = localStorage.getItem('bgColor');
	}




	document.getElementById('green').onclick = function(){
		document.getElementsByTagName('body')[0].style.background = 'green';
		localStorage.setItem('bgColor','green');
	}
	document.getElementById('blue').onclick = function(){
		document.getElementsByTagName('body')[0].style.background = 'blue';
		localStorage.setItem('bgColor','blue');
	}
}