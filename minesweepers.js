//Home Screen
function home() {
    //Opens the game Screen
    document.getElementById("home").style.display = "block";
    //Removes the home screen
    document.getElementById("game").style.display = "none";
    document.getElementById("game").removeChild();// @hliwudnew this causes errors              !!!!!!!!!!!!!!!!!!!!!!!!
}
//The game play
function game() {
    //Removes the home Screen
    document.getElementById("home").style.display = "none";
    //Opens the game screen
    document.getElementById("game").style.display = "block";
    //Switches the background
    //document.getElementById("content").style.background = "#0F0F0F";
    //document.getElementById("content").style.backgroundSize = "cover";
    
    //Mines
    mines(diffCount);
}

// game global variables, there here because this will likely change as we move to server-client

var curMine = 1; // current mine value (which one youre on)
var won = false;
var lost = false;

function valMine(mineId) {// validate the current mine
  var idString = mineId.slice(4);// i know how not great this is but like it does work
  var idVal = parseInt(idString);
  console.log(idVal, winNum + 2);

  if(idVal == curMine){// correct mine clickec
    curMine++;
    //$("#mineId").attr("class", "minecl");// change the class to clicked mine
    document.getElementById(mineId).className = "minecl";
  }

  else if(idVal > curMine){// game is lost if you skipped one only (dont count already clicked ones)
    var lost = true;
    gameover();
  }

  if(curMine == winNum + 1){
    won = true;
    gameWin();
  }
}

// won game
function gameWin() {
  console.log("W");
  alert("Dub");
}


// lost game
function gameover() {
  console.log("L");
  alert("You lost the game!");
}

//Leader board
function leader() {

}
//How to play the game
function help() {
    alert("How To Play:\n 1. The goal of the game is to click each mine in order from 1 - 100.\n 2. Losing is caused by not clicking the correct mine or running out of time. \n 3. To win you must click every mine in order before time runs out! \n 4. Good Luck!");
}
//Difficulty Selection
var diffCount = 0;
function difficulty() {
    diffCount = diffCount + 1;
    if (diffCount > 2) {
        diffCount = 0;
    }
    if (diffCount == 0) {
        document.getElementById("leader").innerHTML = "Easy";
        document.getElementById("leader").style.background = "#03F7EB";
    }
    else if (diffCount == 1) {
        document.getElementById("leader").innerHTML = "Medium";
        document.getElementById("leader").style.background = "#F48C06";
    }
    else if (diffCount == 2) {
        document.getElementById("leader").innerHTML = "Hard";
        document.getElementById("leader").style.background = "#DC2F02";
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
    for (i = 1; i <= minesNum[diffNum]; i = i + 1) {// interesting code style here @hliwudnew
        minesOrder[i - 1] = i;
    }

    // fills array of random mine numbers
    for (var l = 0; l < minesNum[diffNum]; l++) {
      var randIndex = Math.floor(Math.random() * (minesOrder.length));// generate a random (valid) index
      minesRandom.push(minesOrder[randIndex]);// push the random number onto the random array
      minesOrder.splice(randIndex, 1);// remove the randomly selected mine, shift the rest
    }

    //Generates mines
    for (i = 0; i < minesNum[diffNum]; i++) {
      var board = document.getElementById("game");
      var mines = document.createElement("input");
      $(mines).attr("type", "button");
      $(mines).attr("name", minesRandom[i]);
      $(mines).attr("value", minesRandom[i]);
      $(mines).attr("class", "mine");
      $(mines).attr("id", "mine" + minesRandom[i]);
      
      // old code (no longer needed)
      //var minesVal = document.createTextNode(minesRandom[i]);
      //mines.appendChild(minesVal);

      //Puts the mines within the game area
      board.appendChild(mines);
    }
    //validate the mine when its clicked
    $(document).ready(function() {// yes i stole this(ish), no i dont know how it works
      $(".mine").click(function(){
        valMine(this.id);
      }); 
    });
}