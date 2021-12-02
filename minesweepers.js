var url = "http://localhost:3000/post";

var minesNum = [25, 50, 100];// this is global now, makes it easier to change too

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
}

//The game play
function game() {
  //Resets Mine Count @knot moved the mine counter reset, so the leaderData gets the correct mine count
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
  clearInterval(intervalId);
  console.log("W");
  //Back to the beginning
  home();
  //Leader board inputs
  leaderInput();
}


// lost game
function gameover() {
  clearInterval(intervalId);
  console.log("L");
  //Back to the home screen
  home();
  //Leader board inputs
  leaderInput();
}
//Global Leader board variables
// For simplisity is goes from left to right, easy - hard. And in each section the scores go from highest to lowest
var leaderNames = [["Mike Ox", "Joe Mama", "Who?"], ["Sugondeez","Herobrine","Some Guy George"], ["Candice","Fitness","Your Mother"]];
var leaderScores = [[10,7,3], [20,15,10], [30,20,10]];
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
            document.getElementById("text").innerHTML = document.getElementById("text").innerHTML +"<br>" +leaderNames[i][j] +": " + leaderScores[i][j];
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
    document.getElementById("back").onclick = function () { leaderData(nameInput.value); removeButt("back"); removeText("text"); removeIn("name"); removeDiv("nameDiv"); home() };
}

//Leader Board Configurator
function leaderData(name) {
    //Runs through each place, ie 1 ,2 , 3
    for (i = 0; i < leaderNames.length; i = i + 1) {
        //Checks if the score is better than any in the difficulty
        if (curMine -1 > leaderScores[diffCount][i]) {
            //Replaces leader board with the new name and score
            leaderNames[diffCount][i] = name;
            leaderScores[diffCount][i] = curMine - 1;
            //Leaves the loop in order to only take the highest ranking the score achieves
            break;
        }
    }
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
var minesRandom; // this is global to work with the function, SLOPPY
function mines(diffCount) {
  getMines(diffCount);
}

//Timer globals
//The timer's value and it's ID
var tmr;
var intervalId

//Timer
function timer(diffCount) { // this is scuffed in that im assuming neither of us completely know how it works, i assume some of this is redundant

  //Original time to start the timer from
  var start = new Date();
  //Each difficulty in seconds from Easy - Hard(for now)
  var timeLeft = [10, 360, 240];

  $("#timer").text((start - new Date()) / 1000 + timeLeft[diffCount] + " remaining");// this is here to remove the 1s delay before it appears

  //Counts down from the time selected by the difficulty
  intervalId = setInterval(timerUpdate, 1000, start, diffCount); // this is BY FAR my least favourite feature, the other paramaters to pass have to be after for it to work
}

function timerUpdate(start, diffCount) {

  //notes: parse int is there to cast it as an int, idk if this is the best way but it does work lol

  //Each difficulty in seconds from Easy - Hard(for now)
  var timeLeft = [10, 360, 240];
  $("#timer").text(parseInt((start - new Date()) / 1000) + timeLeft[diffCount] + " remaining");
  tmr = parseInt((start - new Date()) / 1000) + timeLeft[diffCount];// this should hopefully actully update the variable
  if (tmr <= -1) {// -1 cause otherwise it wont propagate the 0
    tmr = 100;// yeah yeah this is scuffed but it works (stops multiple alerts from being made)
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
    $(document).ready(function () {// yes i stole this(ish), no i dont know how it works
      $(".mine").click(function () {
        valMine(this.id);
      });
    });
  } 
  
  else if (response['action'] == 'evaluate'){ // THIS IS FOR LEADERBOARD STUFF
      // acttion: Evaluate
      // after receiving the server's response, 
      // then make the button <div> visible
      var win = response['win'];
      var num_match = response['num_match'];
      var num_containing = response['num_containing'];
      var num_not_in = response['num_not_in'];
      var code = response['code']
  }
}