var express = require('express');
var app = express();
var mines = [];

//Global Leader board variables
// For simplisity is goes from left to right, easy - hard. And in each section the scores go from highest to lowest
var leaderNames = [["George", "Joe", "William"], ["Sarah","Herobrine","Phillip"], ["Candice","Kurt","Brendan Eich"]];
var leaderScores = [[10, 7, 3], [20, 15, 10], [30, 20, 10]];
var leaderTimes = [["6:12", "5:11", "4:10"], ["5:07", "3:11", "2:10"], ["3:17", "2:10", "1:32"]];

app.post('/post', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("New express client");
    console.log("Received: ");
    console.log(JSON.parse(req.query['data']));
    var postData = JSON.parse(req.query['data']);

    // check if the request action is generateMInes
    if (postData['action'] == "generateMines") {
        //generate a code for this user
        var diffNum = postData['diffNum'];
        mines = generateMines(diffNum);
        var jsontext = JSON.stringify({
            'action': 'generateMines',
            'msg': 'New mines generated!!!',
            'mines': mines// why is it like this? idk. but thats how their code was
        });
        console.log(jsontext);
        console.log(mines);
        // send the response while including the JSON text		
        res.send(jsontext);
    } 
    else if (postData['action'] == "leader") {
        
      var name = postData['name'];
      var timeLeft = postData['timeLeft'];
      var tmrHolder = postData['tmrHolder'];
      var curMine = postData['curMine'];
      var diffCount = postData['diffCount'];

      var jsontext = updateLeader(name, timeLeft, tmrHolder, curMine, diffCount);
      //evaluate the attempt_code for this user
        console.log(jsontext);
        res.send(jsontext);
    } 
    else {
        res.send(JSON.stringify({ 'msg': 'error!!!' +  postData['action']}));
    }
}).listen(3000);
console.log("Server is running!");

function generateMines(diffNum) {
  console.log("generateMines");
  //generate code
  
  //difficulties
  var minesNum = [25, 50, 100];
  //Gets all numbers from 1 - minesNum[num] and puts the into the array
  var minesOrder = [];
  //Array of randomized mines
  var minesRandom = [];
  var l = minesOrder.length;
  winNum = minesNum[diffNum];

  //Puts 1 to the number of mines into the array
  for (i = 1; i <= minesNum[diffNum]; i = i + 1) {
    minesOrder[i - 1] = i;
  }

  // fills array of random mine numbers
  for (var l = 0; l < minesNum[diffNum]; l++) {
    var randIndex = Math.floor(Math.random() * (minesOrder.length));// generate a random (valid) index
    minesRandom.push(minesOrder[randIndex]);// push the random number onto the random array
    minesOrder.splice(randIndex, 1);// remove the randomly selected mine, shift the rest
  }

  //store the code for this client
  return(minesRandom);
}

function updateLeader(name, timeLeft, tmrHolder, curMine, diffCount) {
    //Converts the time from time left to time used, and puts it into minutes and seconds
    var m = timeLeft[diffCount]/60 - (Math.ceil(tmrHolder / 60));
    var s = 60 - (tmrHolder % 60);
    //Used to temp store the seconds of the leaders
    var leaderSecHolder = [];
    //Gets the seconds and minutes of each of the leaders in the selected difficulty in the leaderboard
    for (i = 0; i < leaderTimes.length; i = i + 1) {
        //leaderSecHolder[i] = parseInt(leaderTimes[diffCount][i].slice(2));
        //leaderMinHolder[i] = parseInt(leaderTimes[diffCount][i].charAt(0));// only works up to 9:59

        leaderSecHolder[i] = parseInt(leaderTimes[diffCount][i].slice(2));
        leaderSecHolder[i] += 60*(parseInt(leaderTimes[diffCount][i].charAt(0)));// only works up to 9:59
        console.log(leaderSecHolder[i]);
    }
    //Runs through each place, ie 1 ,2 , 3
    for (i = 0; i < leaderNames.length; i = i + 1) {
        //Checks if the score is better than any in the difficulty
        // Will put on leader if the score has more mines,  will put on leader if they took less time: total seconds check
        //if (curMine - 1 > leaderScores[diffCount][i] || (curMine - 1 == leaderScores[diffCount][i] && (m < leaderMinHolder[i])) || leaderScores[diffCount][i] && (m == leaderMinHolder[i] && s < leaderSecHolder[i])) {
          if (curMine - 1 > leaderScores[diffCount][i] || (curMine - 1 == leaderScores[diffCount][i] && (((m*60)+s) <= leaderSecHolder[i]))) {
          // Replaces leader board with the new name and score, bumps down if its position 1 or 2
            if(i == 0) {
              leaderNames[diffCount][i+2] = leaderNames[diffCount][i+1];
              leaderScores[diffCount][i+2] = leaderScores[diffCount][i+1];
              leaderTimes[diffCount][i+2] = leaderTimes[diffCount][i+1];
              leaderNames[diffCount][i+1] = leaderNames[diffCount][i];
              leaderScores[diffCount][i+1] = leaderScores[diffCount][i];
              leaderTimes[diffCount][i+1] = leaderTimes[diffCount][i];
            }

            else if(i == 1) {
              leaderNames[diffCount][i+1] = leaderNames[diffCount][i];
              leaderScores[diffCount][i+1] = leaderScores[diffCount][i];
              leaderTimes[diffCount][i+1] = leaderTimes[diffCount][i];
            }

            leaderNames[diffCount][i] = name;
            leaderScores[diffCount][i] = curMine - 1;
            if (s < 10) {
              leaderTimes[diffCount][i] = (m + ":0" + s).toString();
            }
            else {
              leaderTimes[diffCount][i] = (m + ":" + s).toString();
            }
            //Leaves the loop in order to only take the highest ranking the score achieves
            break;
        }
    }
    console.log(leaderNames);
    console.log(leaderScores);
    console.log(leaderTimes);

    return(JSON.stringify({
      'action': 'leader',
      'leaderNames': leaderNames,
      'leaderScores': leaderScores,
      'leaderTimes': leaderTimes
    }));
}