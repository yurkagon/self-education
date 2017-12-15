for(let i = 0; i < 9; i++){
	document.getElementById('game').innerHTML += "<div class='block'></div>";
}

var ar = document.getElementsByClassName('block');


var pl1 = "X", pl2 = "O";
var s = pl1;

for(let i = 0; i < 9; i++){
	ar[i].onclick = function(){
		if(this.innerHTML != pl1 && this.innerHTML != pl2){
			this.innerHTML = s;

		    if(s == pl1) s = pl2;
	        else s = pl1;
		}
	}

}

function checkWon(){



	//function check(symb){
	//	if(ar[0].innerHTML == symb && ar[0].innerHTML == symb && ar[0].innerHTML == symb && )
	//}
}

