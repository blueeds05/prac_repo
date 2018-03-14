var rNum = document.querySelector("#red");
var gNum = document.querySelector("#green");
var bNum = document.querySelector("#blue");
var min = 0;
var max = 256;
var randColor;
var newColor = document.querySelector(".navBar-navLeft");
var navRgt = document.querySelectorAll(".navBar-navRight span");
var rndSquare = document.querySelectorAll(".rndSqr");
var myTryAgain = document.getElementById("tryAgain");
var grpB = document.querySelector(".groupB");
var colorNum=[];
var colString;
var tempHolder;
var rgbString;
var sqrClickAble = true;

var colorArray=[];

allSet();

newColor.addEventListener("click",function(){

	resetOpaque();
	allSet();
	
});

myTryAgain.addEventListener("click",function(){
	sqrClickAble=true;
	this.classList.add("hideMe");
});

navRgt[0].addEventListener("click",function(){
	grpB.classList.add("hideMe");
	rndSquare = document.querySelectorAll(".groupA .rndSqr");
	colorArray = [];
	resetOpaque();
	allSet();
	// console.log("new length of rndSquare = " + rndSquare.length);
});

navRgt[1].addEventListener("click",function(){
	grpB.classList.remove("hideMe");
	rndSquare = document.querySelectorAll(".rndSqr");
	colorArray = [];
	resetOpaque();
	allSet();
	// console.log("new length of rndSquare = " + rndSquare.length);
});

function allSet(){

	//fill colorArray with random rgb()
	for (var i = 0; i < rndSquare.length; i++) {
		// document.body.style.background = getRGB();

		//put colors to array
		colorArray[i] = getRGB();
		// console.log("==> "+colorArray[i]);
		
	};

	//shuffle array
	//form -> Math.floor(Math.random() * (max - min)) + min
	var index = Math.floor(Math.random() * (rndSquare.length - 0)) + 0;

	
	//take last color and save to tempHolder
	tempHolder = colorArray.pop();
	// console.log("popped out " + tempHolder);

	//put back tempHolder data into colorArray with random index
	colorArray.splice(index,0,tempHolder);

	//reset headTitle background to default
	document.querySelector(".headTitle").style.background = '#aa3f1f';	

	//update color of boxes
	for (var i = 0; i < colorArray.length; i++) {
		rndSquare[i].style.background = colorArray[i];
		// console.log("new sort -> " + colorArray[i]);
	};	

	//set squares to clickable
	sqrClickAble=true;

	//change back to TRY AGAIN and NEW COLOR
	myTryAgain.innerHTML = "TRY&nbspAGAIN";
	newColor.innerHTML = "NEW&nbspCOLOR";
}

function colorAllBox(color){
	for (var i = 0; i < rndSquare.length; i++) {
		rndSquare[i].style.background = color;
		rndSquare[i].style.opacity = 1;
	};
}

function getRGB(){

	for (var i = 0; i < 3; i++) {
		colorNum[i] = getRandomInt(min,max);
	};
	rNum.innerHTML = colorNum[0];
	gNum.innerHTML = colorNum[1];
	bNum.innerHTML = colorNum[2];
	let colString = colorNum

	//convert to string (toString) 
	//with 0 in front if length < 2 e.g. 9 => "09" (padStart(len, "char"))
	.map( x => x.toString(16).padStart(2,"0")) 
	.join('');

	//store last color combo  e.g rgb(99, 125, 55)
	//"\"rgb("+colorNum[0].toString()+", "+colorNum[1].toString()+", "+colorNum[2].toString()+")\"";
				
	rgbString = "rgb("+colorNum[0]+", "+colorNum[1]+", "+colorNum[2]+")";
	// console.log("rgbString = "+rgbString);
	return `#${colString}`;

	// // rgb -> hex
	// let color = colorNum
	// .map( x => x.toString(16))
	// .join('');
	// var temp = `#${color}`;
	// console.log(temp);
	// console.log("$color");
	// return `#${color}`;
}

// getRandomInt(arg1, arg2) returns  a random number 
// from 'arg1' to 'arg2 - 1 ' -- arg2 not included
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// this didn't work :-(
// function updateColors(i){
// 		colString =  "\"rgb("+colorNum[0]+","+colorNum[1]+","+colorNum[2]+")\""; 
// 		//document.querySelectorAll(".rndSqr")[0].style.background = colString;
// 		rndSquare[i].style.background = colString;
		// console.log(i + " " + colString);
// }


//clicking on squares
for (var i = 0; i < rndSquare.length ; i++) {
	rndSquare[i].addEventListener("click", function(){
		if(sqrClickAble){
			var boxColor = this.style.background;
			// console.log(boxColor);
			var match = rgbString === boxColor ? true:false;
			console.log(match);
			if(match){
				document.querySelector(".headTitle").style.background = boxColor;
				sqrClickAble =false;
				colorAllBox(boxColor);
				myTryAgain.innerHTML = "CORRECT!";
				newColor.innerHTML = "PLAY&nbspAGAIN?";
				myTryAgain.classList.remove("hideMe");
			}else{
				fadeAway(this);
				myTryAgain.classList.remove("hideMe");
	 			
	 			//disable clicking of squares 
				sqrClickAble =false;
				
			}	
		}else{

			flicker(myTryAgain);
		}	


	});	
};
function flicker(element){
	element.style.fontWeight = "bold"
	element.animate({
  		opacity: [ 0, 1 ],          // [ from, to ]
  		color:   [ "#fff", "#000" ] // [ from, to ]
	}, {
		duration: 500,
		iterations:3
	});

}

function fadeAway(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        op -= 0.1;
    }, 50);
}

function fadeOut(which){
	var y=1;
	// console.log(which);
	var timer = setInterval(function () {
		if(y >= 0.1){
			y-=0.1;
		 	which.style.opacity = y;
			// console.log(which.style.opacity)
		}else{
			clearInterval(timer);
		}
    }, 50);
}

function resetOpaque(){
	for (var i = 0; i < rndSquare.length; i++) {
		rndSquare[i].style.opacity = 1;
		document.getElementById("tryAgain").classList.add("hideMe");
	
	};
}

//