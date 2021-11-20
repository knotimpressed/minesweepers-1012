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
    document.getElementById("content").style.background = "#0F0F0F";
    document.getElementById("content").style.backgroundSize = "cover";
    //Mines
    mines(diffCount);
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
function mines(diffNum) {
    //difficulties
    var minesNum = [25, 50, 100];
    //Gets all numbers from 1 - minesNum[num] and puts the into the array
    var minesOrder = [];
    //Array of randomized mines
    var minesRandom = [];
    var l = minesOrder.length;
    var j = 0;
    var temp;
    //Puts 1 - number of mines into the array
    for (i = 1; i <= minesNum[diffNum]; i = i + 1) {// interesting code style here @hliwudnew
        minesOrder[i - 1] = i;
    }
    console.log(minesOrder);

    for (var l = minesOrder.length - 1; l > 0; l--) {
      var randIndex = Math.floor(Math.random() * (l + 1));// generate a random (valid) index, could use minesOrder.length instead of l
      minesRandom.push(minesOrder[randIndex]);// push the random number onto the random array
      minesOrder.splice(randIndex, 1);// remove the randomly selected mine, shift the rest
    }


    //Randomizes the mines numbers ( no work right now)
    /*for (var l = minesLength.length - 1; l > 0; l--) {
        var j = Math.floor(Math.random() * (l + 1));
        var temp = minesRandom[l];
        minesRandom[l] = minesRandom[j];
        minesRandom[j] = temp;
    }*/
    //Generates mines based on difficulty
    for (i = 1; i <= minesNum[diffNum]; i++) {
      var board = document.getElementById("game");
      var mines = document.createElement("button");
      $(mines).attr("class", "mine");
      var minesVal = document.createTextNode(minesRandom[i]);
      mines.appendChild(minesVal);
      //Puts the mines within the game area
      board.appendChild(mines);
    }

    /*for (i = 1; i <= minesNum[num]; i = i + 1) {
        var board = document.getElementById("game");
        var mines = document.createElement("button");
        $(mines).attr("class", "mine");
        var minesVal = document.createTextNode(i);
        mines.appendChild(minesVal);
        //Puts the mines within the game area
        board.appendChild(mines);
    }*/
}
