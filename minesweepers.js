var url = "http://localhost:3000/post";

var minesNum = [25, 50, 100];// this is global now, makes it easier to change too
var timeLeft = [480, 360, 240];

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

  leaderData("admin", 1);// update leaderboard by submitting a very low score
}

//The game play
function game() {
    //Prevents a Duplication of the Back button
    if (document.getElementById("backH")) {
        removeButt("backH");
    }
  //Resets Mine Count
    curMine = 1;
  //Removes the home Screen
  document.getElementById("home").style.display = "none";
  //Opens the game screen
  document.getElementById("game").style.display = "block";
  //Mines
  mines(diffCount);
  $("#count").html(0 + "/" + minesNum[diffCount]);
  //Clears previous timer
  document.getElementById("timer").innerHTML = "";
  clearInterval(intervalId);
  //Starts timer
  timer(diffCount);
  //Creates back button
  var backButton = document.createElement("button");
  $(backButton).attr("id", "backH");
  backButton.innerHTML = "Back";
  $(".headright").append(backButton);
  //Returns to home screen
  document.getElementById("backH").onclick = function () { removeButt("backH"); clearInterval(intervalId); home() };
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

  $("#count").html(curMine - 1 + "/" + minesNum[diffCount]);

  if (curMine == minesNum[diffCount] + 1) {
    won = true;
    gameWin();
  }
}

// won game
function gameWin() {
  tmrHolder = tmr + 1;
  clearInterval(intervalId);
  console.log("W");
  //Back to the beginning
  home();
  //Leader board inputs
  leaderInput();
}


// lost game
function gameover() {
  tmrHolder = tmr + 1;
  clearInterval(intervalId);
  console.log("L");
  //Back to the home screen
  home();
  //Leader board inputs
  leaderInput();
}

//Global Leader board variables, not really needed but here so it all works
// For simplicity is goes from left to right, easy - hard. And in each section the scores go from highest to lowest
var leaderNames = [["George", "Joe", "William"], ["Sarah","Herobrine","Phillip"], ["Candice","Kurt","Brendan Eich"]];
var leaderScores = [[10, 7, 3], [20, 15, 10], [30, 20, 10]];
var leaderTimes = [["6:12", "5:11", "4:10"], ["5:07", "3:11", "2:10"], ["3:17", "2:10", "1:32"]];

//Leader board, to look at it
function leader() {
    //Displays the popup box and it's content
    document.getElementById("popUp").style.display = "block";
    //Creates the text element
    var text = document.createElement("div");
    $(text).attr("id", "text");
    $("#popUp").append(text);
    //Used for the coloring and medals of each leaderboard holder
    let difficulty = ["Easy", "Medium", "Hard"];
    let diffColor = ["#03F7EB", "F48C06", "DC2F02"];
    //Prints out the leader board
    for (i = 0; i < leaderNames.length; i = i + 1) {
        //Sets up each difficult leaderboard
        document.getElementById("text").innerHTML = document.getElementById("text").innerHTML + "<br>" + "<u>" + difficulty[i].fontcolor(diffColor[i]) + "</u>";
        for (j = 0; j < leaderNames.length; j = j + 1) {
            //Prints out the leaders and their scores
            document.getElementById("text").innerHTML = document.getElementById("text").innerHTML + "<br>" + leaderNames[i][j] + ": " + leaderScores[i][j] + ", " + leaderTimes[i][j];
        }
    }
    //Creates the back button
    var backButton = document.createElement("button");
    $(backButton).attr("id", "back");
    backButton.innerHTML = "Back";
    $("#popUp").append(backButton);
    //Clears the screen
    document.getElementById("back").onclick = function () { removeButt("back"); removeText("text"); home() };

}

// if you need this to remove other buttons just pass the class
function removeButt (buttName){
  document.getElementById(buttName).remove();
}
// if you need this to remove other inputs just pass the class
function removeIn(inputName) {
    document.getElementById(inputName).remove();
}
// if you need this to remove other texts just pass the class
function removeText(textName) {
    document.getElementById(textName).remove();
}
// if you need this to remove other divs just pass the class
function removeDiv(divName) {
    document.getElementById(divName).remove();
}
//To input data into the leader board
function leaderInput() {
    //Removes Back button
    removeButt("backH");
    //Displays the popup
    document.getElementById("popUp").style.display = "block";
    //Creates the text element
    var text = document.createElement("div");
    $(text).attr("id", "text");
    $("#popUp").append(text);
    var mineScore = curMine - 1; // No idea why this fixes the score output, but it does
    document.getElementById("text").innerHTML = "Your Score" + "<br>" + mineScore;
    //Creates a div for the name input
    var nameDiv = document.createElement("div");
    $(nameDiv).attr("id", "nameDiv");
    $("#popUp").append(nameDiv);
    //Displays the Name Input
    var nameInput = document.createElement("input");
    $(nameInput).attr("type", "text");
    $(nameInput).attr("id", "name");
    $(nameInput).attr("class", "name");
    $("#nameDiv").append(nameInput);
    //Displays input button
    var inputButton = document.createElement("button");
    $(inputButton).attr("id", "back");
    inputButton.innerHTML = "Send Data";
    $("#popUp").append(inputButton);
    //Clears the screen and Calls the leader board data
    document.getElementById("back").onclick = function () { 
      leaderData(nameInput.value, curMine); 
      removeButt("back"); removeText("text"); 
      removeIn("name"); 
      removeDiv("nameDiv"); 
      home()
    };
}

//Leader Board Configurator
function leaderData(name, curMineLead) {

    //inputs are name, timeleft, tmrholder, curmine
    // for leader display use this with no name and no score



    $.post(url+'?data='+JSON.stringify({
      'action':'leader',
      'name': name,
      'timeLeft': timeLeft,
      'tmrHolder': tmrHolder,
      'curMine': curMineLead,
      'diffCount': diffCount
    }),
    response);
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
  //Clears the screen
  document.getElementById("back").onclick = function () { removeButt("back"); removeText("text"); home() };
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
    $("#hard").attr("id", "easy");
  }
  else if (diffCount == 1) {
    document.getElementById("diff").innerHTML = "Medium";
    $("#easy").attr("id", "med");
    document.getElementById("diff").style.background = "#F48C06";

  }
  else if (diffCount == 2) {
    document.getElementById("diff").innerHTML = "Hard";
    document.getElementById("diff").style.background = "#DC2F02";
    $("#med").attr("id", "hard");

  }
}

//Random Mine Number Generation
var minesRandom; // this is global to work with the function
function mines(diffCount) {
  getMines(diffCount);
}

//Timer globals
//The timer's value and it's ID
var tmr;
var intervalId
var tmrHolder;
//Timer
function timer(diffCount) { // this is scuffed in that im assuming neither of us completely know how it works, i assume some of this is redundant

  //Original time to start the timer from, this is here so the total time shows up
  var start = new Date();
  tmr = timeLeft[diffCount];

  var m = Math.floor(tmr / 60);
  var s = tmr % 60;
  //Displays the timer in minutes and seconds
  //Creates a 0 in the tens position when seconds is less than 10
  if (s < 10) {
      $("#timer").text(m + ":0" + s + " remaining");
  }
  else {
      $("#timer").text(m + ":" + s + " remaining");
  }

  //Counts down from the time selected by the difficulty
  intervalId = setInterval(timerUpdate, 1000, start, diffCount); // this is BY FAR my least favourite feature, the other paramaters to pass have to be after for it to work
}

function timerUpdate(start, diffCount) {
  tmr = parseInt((start - new Date()) / 1000) + timeLeft[diffCount];// this should hopefully actully update the variable


    //Minute and Second variables, converts tmr to minutes and seconds
    var m = Math.floor(tmr / 60);
    var s = tmr % 60;
    //Displays the timer in minutes and seconds
    //Creates a 0 in the tens position when seconds is less than 10
    if (s < 10) {
        $("#timer").text(m + ":0" + s + " remaining");
    }
    else {
        $("#timer").text(m + ":" + s + " remaining");
    }
  if (tmr <= -1) {// -1 cause otherwise it wont propagate the 0
    tmrHolder = 0; //Used to send the time to the leaderboard
    //tmr = 100;// yeah yeah this is scuffed but it works (stops multiple alerts from being made)
    clearInterval(intervalId);
    gameover();
  }
}

function getMines(diffCount){
  //send request to server to start a new game.
  $.post(url+'?data='+JSON.stringify({
                  'action':'generateMines',
                  'diffNum': diffCount
                }),
         response);
  
}

/*
 * Event handler for server's response
 * @param data is the json format string sent from the server
 */
function response(data, status){
  var response = JSON.parse(data);
  console.log(data);
  if (response['action'] == 'generateMines'){
    minesRandom = response['mines'];
    console.log("minesRandom:" + minesRandom);

    console.log(minesRandom);

    // this is here so it only runs once we get the responce

    $("#game").html("");// clears previous mines
    // Generates mines
    for (i = 0; i < minesNum[diffCount]; i++) {
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
    $(document).ready(function () {
      $(".mine").click(function () {
        valMine(this.id);
      });
    });
  } 
  
  else if (response['action'] == 'leader'){ // THIS IS FOR LEADERBOARD STUFF
      leaderNames = response['leaderNames'];
      leaderScores = response['leaderScores'];
      leaderTimes = response['leaderTimes'];

  }
}