// in general this code sucks cause we dont need to keep all the mines stored, however it does work


var express = require('express');
var app = express();
var mines = [];

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
    else if (postData['action'] == "evaluate") {
        //evaluate the attempt_code for this user
        var [num_match, num_containing, num_not_in]
            = evaluate(codes[postData['name']], postData['attempt_code']);

        var answer = [];
        if ((num_match == code_length) || (num_attempts == postData["current_attempt_id"]))
            answer = codes[postData['name']];

        var win = false;
        if (num_match == code_length) win = true;

        var jsontext = JSON.stringify({
          'action': 'evaluate',
          'win': win,
          'num_match': num_match,
          'num_containing': num_containing,
          'num_not_in': num_not_in,
          'code': answer
        });
        console.log(jsontext);
        res.send(jsontext);
    } 
    else {
        res.send(JSON.stringify({ 'msg': 'error!!!' +  postData['action']}));
    }
}).listen(3000);
console.log("Server is running!");

function generateMines(diffNum) {
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