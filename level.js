/* Name: Kyle Fritz
   File: level.js
   Date Created: 3/8/17
   Description: JS file to accompany proj1.html. This file focuses on determining when to change to a new level and score calculation.
*/

// input: any type of number
// output: returns that number as an int
function toInteger(number) {
	return Math.round(Number(number)); 
}

// Print the amount of time that the player has until the game ends
function printTimeToScreen() {
	var timeLeft = toInteger(timeLimit - levelSecondsPassed);
	document.getElementById("timeRemaining").innerHTML = timeLeft + " Seconds Left!";
}

// Printing the player's current score to the screen
function printScoreToScreen() {
	document.getElementById("playerCurrentScore").innerHTML = "Score<br />" + score;
}

// defining seconds to calculate score
function getTimeDiff(end, start) {
	return((end.getTime() - start.getTime()) / 1000);
}

// Check if the right page is displayed on the screen, used to keep time from ticking if not on the screen
function isClockPageDisplayed() {
	return (document.getElementById("clockPage").style.display == "block");
}

// Calculates the student's grade
function calculateStudentGrade() {
	if(totalAnswers <= 0){ // no answers were given
		studentGrade = 0;
	}
	else{
		studentGrade = 100 * (totalCorrectAnswers / totalAnswers);
	}
	studentGrade = toInteger(studentGrade); // round up the grade
}

// calculates the new score after every correctly answered time
function calculateNewScore() {
	score += (1 / seconds) * 10000 * scoreMultiplier; // using the amount of time it takes to answer the question and the scoreMultiplier, figure out the new score 
	score = toInteger(score); // make the score a whole number
}

// Sets up everything correctly for the next level
function startNewLevel() {
	levelNumber += 1; // next level
	scoreMultiplier = levelNumber; // bigger score
	levelCorrectAnswers = 0; // no answers yet for this level

	var currentLevel = document.getElementById("currentLevel");
	currentLevel.innerHTML = "Level " + levelNumber;

	timeLimit -= 10; // 10 less seconds for the new level
	levelStartTime = startTime = new Date(); // new time
}

// every 4 correct answers, a new level begins
function checkIfNextLevel() {
	if(levelCorrectAnswers >= 4){
		startNewLevel();
		rightOrWrong.innerHTML = "Level " + levelNumber + "! Sweet!";
	}
	else{
		startTime = new Date(); // used for speed of answer calculation
	}
}

function printMessage() {
	if (totalCorrectAnswers == 25){
		rightOrWrong.innerHTML = "You aren't human!";
	}
	else if (totalCorrectAnswers == 10){
		rightOrWrong.innerHTML = "You're incredible!"
	}
	else if (totalCorrectAnswers%4 == 1){
    	rightOrWrong.innerHTML = "Yes!"
    }
    else if (totalCorrectAnswers%4 == 2){
    	rightOrWrong.innerHTML = "Go " + getName() + "!";
   	}
    else if (totalCorrectAnswers%4 == 3){
   		rightOrWrong.innerHTML = "You're on fire!"
   	}
}

// get the selected hour and minute from the user, then compare those to the actual time on the clock, return if they both are the same
function isCorrectTime() {
	var userHour = document.getElementById("hourSelect");
    var userMinute = document.getElementById("minuteSelect");
    userHour = parseInt(userHour.options[userHour.selectedIndex].text);
    userMinute = parseInt(userMinute.options[userMinute.selectedIndex].text);
	return (userHour == hour && userMinute == minute);
}

// Determines if the user has the correct clock time, and gets everything together if it is
function testUserTime() {
	totalAnswers += 1; // 1 more answer
    if(isCorrectTime()){
		totalCorrectAnswers += 1; // a correct answer!
		levelCorrectAnswers += 1;
    	seconds = getTimeDiff(new Date(), startTime);
    	calculateNewScore();
    	printScoreToScreen();

    	printMessage(); // For the user to know that they got the time right
    	
    	getNewClock();
    	checkIfNextLevel();
    }
    else{
    	rightOrWrong.innerHTML = "Nope, try again!"
    }
}

// You got the new high score!
function setNewHighScore(row){
	row.cells[0].innerHTML = getName();
	row.cells[1].innerHTML = score;
}

function checkHighScore() {
	var row, nextRow, highScoresTable = document.getElementById("highScoresTable");

	for(var i = 3; i >= 1; i--){
		row = highScoresTable.rows[i];
		if(i < 3){ // can't have 4th row
			nextRow = highScoresTable.rows[i+1];
		}

		highScore = parseInt(row.cells[1].innerHTML);
		if(score > highScore){ 	// check if your score > highScore
			switch(i){
				case 3: // just set the score, no need to keep 3rd highest score
					setNewHighScore(row);
					break;
				default: // case 2 or case 1
					nextRow.cells[0].innerHTML = row.cells[0].innerHTML;
					nextRow.cells[1].innerHTML = row.cells[1].innerHTML;
					setNewHighScore(row);
					break;
			}
		}
		else{ // not a higher score on the leaderboard
			break;
		}
	}
}

// Resetting the game for the next player
function resetGame() {
	score = 0, timeLimit = 90, levelCorrectAnswers = 0, totalCorrectAnswers = 0, totalAnswers = 0;
	studentGrade = 0, levelNumber = 1, scoreMultiplier = levelNumber, gameOverFlag = false;
	rightOrWrong.innerHTML = "What time is it?";
	document.getElementById("currentLevel").innerHTML = "Level 1";

	printScoreToScreen();
	document.getElementById("timeRemaining").innerHTML = 90 + " Seconds Left!";
}

function calculateRemainingTime() {
	if(!isClockPageDisplayed()){
		startTime = levelStartTime = new Date(); // for calculation of score/remaining time
		return;
	}
	else if(gameOverFlag){
		return;
	}

	levelSecondsPassed = getTimeDiff(new Date(), levelStartTime);
	if(levelSecondsPassed > timeLimit){
		gameOverFlag = true;
		document.getElementById("timeRemaining").innerHTML = "Game Over!";
		calculateStudentGrade();
		checkHighScore(); // put your score on the high score table if it is larger than any of them.
		alert("Game over!");

		setTimeout(returnToHomescreen, 3000);
	}
	else{
		printTimeToScreen();
	}
}

var levelStartTime, levelSecondsPassed, startTime, seconds; // For amount of time between levels and for score calculation
var timeLimit = 90; // 90 seconds for level 1, and 10 less seconds each level
var levelCorrectAnswers = 0, studentGrade = 0, totalCorrectAnswers = 0, totalAnswers = 0; // the grade starts at 0%, 0 correct answers to start, 0 answers in total to start
var score = 0; // start at a score of 0
var gameOverFlag = false;
var levelNumber = 1, scoreMultiplier = levelNumber; // added scores will always be multiplied by the level 

var rightOrWrong = document.getElementById("rightOrWrong");

startTime = levelStartTime = new Date(); // for calculation of score/remaining time
setInterval(calculateRemainingTime, 1000); // calculate time left for the level every second