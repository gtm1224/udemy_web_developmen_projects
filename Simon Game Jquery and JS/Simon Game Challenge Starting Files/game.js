// tests:
// $(document).ready(function){
//   alert("hello world!");
// }
// alert("hello!")


var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];

//nextSequence() function will generate a new random number between 0 and 3, and store it in a variable called randomNumber
function nextSequence(){
  var randomNumber =Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  // pick the btn has the random chosen color, then apply animation.
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(sound_instruction){
	var audio =new Audio("sounds/"+sound_instruction+".mp3");
	audio.play();
}