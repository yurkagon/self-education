var password = '';

document.onkeypress = function(event){

	//document.getElementById('out').innerHTML += event.key;
}

document.getElementById('pass').onkeypress = function(e){
	password += e.key;
	this.value = '';
	for(var i = 0; i < password.length; i++) this.value += '*';



    return false;
}

document.getElementById('pass').oninput = function(){
   var dif = password.length - this.value.length;
   password = password.slice(0,-dif);
   //console.log(dif);

}



