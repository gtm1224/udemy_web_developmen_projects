// tests:
// $(document).ready(function){
//   alert("hello world!");
// }
// alert("hello!")


var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern=[];
var game_level=0;
var start=false;

// game start by pressing a key
$(document).keypress(function() {
  if (!start) {
    $("#level-title").text("Level "+ game_level);
    nextSequence();
    start = true;
  }
});


//nextSequence() function will generate a new random number between 0 and 3, and store it in a variable called randomNumber
function nextSequence(){
  userClickedPattern=[];
  game_level++;
  $("#level-title").text("Level"+game_level);
  var randomNumber =Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  // pick the btn has the random chosen color, then apply animation.
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}


//detect which btn user clicked
$(".btn").click(function(){
	var userChosenColor=$(this).attr("id");
	userClickedPattern.push(userChosenColor);
	playSound(userChosenColor);
	animatePress(userChosenColor);
	checkAnswer(userClickedPattern.length-1);
});

// a function that play sound for the chosen button
function playSound(sound_instruction){
	var audio =new Audio("sounds/"+sound_instruction+".mp3");
	audio.play();
}


// a fucntion apply animation to the button that user userClickedPattern
function animatePress(user_color){
	$("#"+user_color).addClass("pressed");
	setTimeout(function(){
	$("#"+user_color).removeClass("pressed");
	},);
}

function checkAnswer(currentLevel){
	if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
		if(userClickedPattern.length===gamePattern.length){
			setTimeout(function() {
				nextSequence();
			},1000);
		}
	}else{
		playSound("wrong");
		$("body").addClass("game-over");
		$("#level-title").text("Game Over, Press Any Key to Restart");
		setTimeout(function () {
		        $("body").removeClass("game-over");
		      }, 200);
		startOver();
	}
}

function startOver(){
	game_level=0;
	start=false;
	gamePattern=[];
}