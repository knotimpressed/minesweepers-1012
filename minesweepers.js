// Current Bugs/Fixes needed: 1. Need to impliment random mine numbers and values. 2. Remove the old set of mines when starting a new game - dont do append

//Home Screen
function home() {
    //Removes the game Screen
    document.getElementById("home").style.display = "block";
    //Switches background
    document.getElementById("content").style.background = "sandybrown";
    document.getElementById("content").style.backgroundSize = "cover";
    //Opens the home screen
    document.getElementById("game").style.display = "none";
    documet.getElementById("game").removeChild();
}
//The game play
function game() {
    //Removes the home Screen
    document.getElementById("home").style.display = "none";
    //Opens the game screen
    document.getElementById("game").style.display = "block";
    //Switches the background
    document.getElementById("content").style.background = "url('images/water.gif')";
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
        document.getElementById("leader").style.background = "green";
    }
    else if (diffCount == 1) {
        document.getElementById("leader").innerHTML = "Medium";
        document.getElementById("leader").style.background = "yellow";
    }
    else if (diffCount == 2) {
        document.getElementById("leader").innerHTML = "Hard";
        document.getElementById("leader").style.background = "red";
    }
}
//Random Mine Number Generation
function mines(num) {
    //difficulties
    var minesNum = [25, 50, 100];
    //Gets all numbers from 1 - minesNum[num] and puts the into the array
    var minesLength = [];
    //Array of randomized mines
    var minesRandom = [];
    var l = minesLength.length;
    var j = 0;
    var temp;
    //Puts 1 - number of mines into the array
    for (i = 1; i <= minesNum[num]; i = i + 1) {
        minesLength[i - 1] = i;
    }
    //Randomizes the mines numbers ( no work right now)
    for (var l = minesLength.length - 1; l > 0; l--) {
        var j = Math.floor(Math.random() * (l + 1));
        var temp = minesRandom[l];
        minesRandom[l] = minesRandom[j];
        minesRandom[j] = temp;
    }
    //Generates mines based on difficulty
    for (i = 1; i <= minesNum[num]; i = i + 1) {
        var board = document.getElementById("game");
        var mines = document.createElement("button");
        $(mines).css("padding", "4px");// adds in padding so the buttons are bigger
        $(mines).css("margin", "4px");// space between buttons
        $(mines).css("font-size", "12px");
        $(mines).css("font-family", "Courier New, monospace");
        $(mines).css("font-weight", "900");
        $(mines).css("color", "white");
        $(mines).css("background-color", "grey");
        var minesVal = document.createTextNode(i);
        mines.appendChild(minesVal);
        //Puts the mines within the game area
        board.appendChild(mines);
    }
}
