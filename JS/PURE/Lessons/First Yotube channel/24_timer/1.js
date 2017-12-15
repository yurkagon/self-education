var sdvig = 0;
var test = document.getElementById('test');
var timer;

function move(){
	test.style.marginLeft = sdvig + 'px';
	sdvig += 30;
	timer = setTimeout(move,50);

}

//var timer = setInterval(move, 50); //1s = 1000
//setTimeout(move,3000); //3 sec

document.getElementById('stop').onclick = function(){
	//clearInterval(timer);
	//clearTimeout(timer);
}

//timer by setInterval()
var timerOut = document.getElementById('timer');
var time = 0;
setInterval(startTimer, 1000);

function startTimer(){
	time++;
	timerOut.innerHTML = time;
}


