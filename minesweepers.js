//Home Screen
function home() {
  //Opens the game Screen
  document.getElementById("home").style.display = "block";
  //Removes the home screen
  document.getElementById("game").style.display = "none";
  //Removes the popups

  // Noting this in case it matters, causes an error in the console becaue they are not defined immediately but it works so yeah
  document.getElementById("popUp").style.display = "none";
  
  //Removes timer and resets it
  document.getElementById("timer").innerHTML = "";
  // removes mine counter
  document.getElementById("count").innerHTML = "";
  curMine = 1;
}

//The game play
function game() {
  //Removes the home Screen
  document.getElementById("home").style.display = "none";
  //Opens the game screen
  document.getElementById("game").style.display = "block";
  //Mines
  mines(diffCount);
  $("#count").html(0 + "/" + winNum);
  //Clears previous timer
  document.getElementById("timer").innerHTML = "";
  //Starts timer
  timer(diffCount);
}
// game global variables, there here because this will likely change as we move to server-client

var curMine = 1; // current mine value (which one youre on)
var won = false;
var lost = false;

function valMine(mineId) {// validate the current mine
  var idString = mineId.slice(4);// i know how not great this is but like it does work
  var idVal = parseInt(idString);
  console.log(idVal);

  if (idVal == curMine) {// correct mine clicked
    curMine++;
    //$("#mineId").attr("class", "minecl");// change the class to clicked mine
    document.getElementById(mineId).className = "minecl";
  }

  else if (idVal > curMine) {// game is lost if you skipped one only (dont count already clicked ones)
    var lost = true;
    gameover();
  }

  $("#count").html(curMine - 1 + "/" + winNum);

  if (curMine == winNum + 1) {
    won = true;
    gameWin();
  }
}

// won game
function gameWin() {
  console.log("W");
  alert("Dub");
  //Just listing it for ordering properly in the future
  leaderInput();
  //Back to the beginning
  home();
}


// lost game
function gameover() {
  console.log("L");
  alert("You lost the game!");
  //Just listing it for ordering properly in the future
  leaderInput();
  //Back to the beginning
  home();
}

//Leader board, to look at it
function leader() {
  //Displays the popup box and it's content
  document.getElementById("popUp").style.display = "block";
  //Create the back button
  var backButton = document.createElement("button");
  $(backButton).attr("id", "back");
  backButton.innerHTML = "Back";
  $("#popUp").append(backButton);
  document.getElementById("back").onclick = function () { removeButt("back"); home() };
}

// if you need this to remove other buttons just pass the class
function removeButt (buttName){
  document.getElementById(buttName).remove();
  document.getElementById("text").innerHTML = "";
}

//To input data into the leader board
function leaderInput() {
  alert("Leader Board input Placeholder");
}
//How to play the game
function help() {
  //Displays the popup box and it's content
  document.getElementById("popUp").style.display = "block";
  //Creates the instructions
  var text = document.createElement("div");
  $(text).attr("id", "text");
  $("#popUp").append(text);
  document.getElementById("text").innerHTML = "How To Play: " + "<br>" + " 1. The goal of the game is to click each mine in order from 1 - 100." + "<br>" + " 2. Losing is caused by not clicking the correct mine or running out of time. " + "<br>" + " 3. To win you must click every mine in order before time runs out!" + "<br>" + "4. Good Luck!";
  //Create the back button
  var backButton = document.createElement("button");
  $(backButton).attr("id", "back");
  backButton.innerHTML = "Back";
  $("#popUp").append(backButton);
  document.getElementById("back").onclick = function () { home() };
}
//Difficulty Selection
var diffCount = 0;
function difficulty() {
  diffCount = diffCount + 1;
  if (diffCount > 2) {
    diffCount = 0;
  }
  if (diffCount == 0) {
    document.getElementById("diff").innerHTML = "Easy";
    document.getElementById("diff").style.background = "#03F7EB";
  }
  else if (diffCount == 1) {
    document.getElementById("diff").innerHTML = "Medium";
    document.getElementById("diff").style.background = "#F48C06";
  }
  else if (diffCount == 2) {
    document.getElementById("diff").innerHTML = "Hard";
    document.getElementById("diff").style.background = "#DC2F02";
  }
}
//Random Mine Number Generation
var winNum;// this is sloppy but its the easiest way to pass the winning mine number
function mines(diffNum) {
  //difficulties
  var minesNum = [25, 50, 100];
  //Gets all numbers from 1 - minesNum[num] and puts the into the array
  var minesOrder = [];
  //Array of randomized mines
  var minesRandom = [];
  var l = minesOrder.length;
  winNum = minesNum[diffNum];

  //Puts 1 to the number of mines into the array
  for (i = 1; i <= minesNum[diffNum]; i = i + 1) {// idk what to make of that comment @Knot // whats wrong with it @hliwudnew?
    minesOrder[i - 1] = i;
  }

  // fills array of random mine numbers
  for (var l = 0; l < minesNum[diffNum]; l++) {
    var randIndex = Math.floor(Math.random() * (minesOrder.length));// generate a random (valid) index
    minesRandom.push(minesOrder[randIndex]);// push the random number onto the random array
    minesOrder.splice(randIndex, 1);// remove the randomly selected mine, shift the rest
  }

  $("#game").html("");// clears previous mines
  // Generates mines
  for (i = 0; i < minesNum[diffNum]; i++) {
    var board = document.getElementById("game");
    var mines = document.createElement("input");
    $(mines).attr("type", "button");
    $(mines).attr("name", minesRandom[i]);
    $(mines).attr("value", minesRandom[i]);
    $(mines).attr("class", "mine");
    $(mines).attr("id", "mine" + minesRandom[i]);
    //Puts the mines within the game area
    board.appendChild(mines);
  }
  //validate the mine when its clicked
  $(document).ready(function () {// yes i stole this(ish), no i dont know how it works
    $(".mine").click(function () {
      valMine(this.id);
    });
  });
}

//Timer globals
//The timer's value and it's ID
var tmr;
var intervalId

//Timer
function timer(diffNum) { // this is scuffed in that im assuming neither of us completely know how it works, i assume some of this is redundant

  //Original time to start the timer from
  var start = new Date();
  //Each difficulty in seconds from Easy - Hard(for now)
  var timeLeft = [5, 360, 240];

  $("#timer").text((start - new Date()) / 1000 + timeLeft[diffNum] + " remaining");// this is here to remove the 1s delay before it appears

  //Counts down from the time selected by the difficulty
  intervalId = setInterval(timerUpdate, 1000, start, diffNum); // this is BY FAR my least favourite feature, the other paramaters to pass have to be after for it to work
}

function timerUpdate(start, diffNum) {

  //notes: parse int is there to cast it as an int, idk if this is the best way but it does work lol

  //Each difficulty in seconds from Easy - Hard(for now)
  var timeLeft = [5, 360, 240];
  $("#timer").text(parseInt((start - new Date()) / 1000) + timeLeft[diffNum] + " remaining");
  tmr = parseInt((start - new Date()) / 1000) + timeLeft[diffNum];// this should hopefully actully update the variable
  if (tmr <= -1) {// -1 cause otherwise it wont propagate the 0
    tmr = 100;// yeah yeah this is scuffed but it works (stops multiple alerts from being made)
    clearInterval(intervalId);
    gameover();
  }
}