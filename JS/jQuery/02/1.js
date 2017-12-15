$(window).ready(function(){


$(".box").click(function(){

		$(".box").animate({top:'250px',color: 'black',
		height:1.5 * $(".box").height() + "px",
		width: 2 * $(".box").width() + "px",
		fontSize: '+=4em',
		borderRadius: 100 + 'px'
	},2000);

	$(".box").animate({
		top:'-=250px',
		color: 'black',
		height:0.5 * $(".box").height() + "px",
		width: 1 * $(".box").width() + "px",
		fontSize: '-=4em',
		borderRadius: 0 + 'px',
	},2000);
})

$('#start').click(function(){
	  $(".box").clearQueue();
	  $(".box").stop();
})

	
})

