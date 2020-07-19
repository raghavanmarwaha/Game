
var buttonColors = ["red", "blue", "green", "yellow"];

var userClickPattern = [];
var gamePattern = [];

// Heading Changes

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Accepting Color from User
$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");

  userClickPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickPattern.length - 1);
});

//Game Code

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    console.log("success");

    if (userClickPattern.length===gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function(){
    $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}
// Next Sequence
function nextSequence() {
  userClickPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChooseColor = buttonColors[randomNumber];
  gamePattern.push(randomChooseColor);
  $("#" + randomChooseColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChooseColor);
}
  // Sound

  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
  // Button Animation
  function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
      $("#" + currentColor).removeClass("pressed");
    }, 100);

  }

  //Start Again
  function startOver(){
    level=0;
    gamePattern=[];
    started=false;
  }
