window.alert('We\'re in Business?');

//My implementation of the game of hangman.
//I have attempted to implement this in the functional style

//Global data structures
let incorrectLetters = [];
let correctLetters = [];
let guessed = false;


//prompts the user to pick an intitial word.
const pickWord = prompt('Pick a word:')

const setupAnswerArray = function(){
	return pickWord.toLowerCase().split('');
}

const checkGuess = function(){
	let getGuess = prompt('Guess a letter or word:');

	if(setupAnswerArray().indexOf(getGuess) === -1 && getGuess !== setupAnswerArray().join('')){
		updateGameState(getGuess,false);
		console.log(getGuess);
		return window.alert('WRONG');
	}
	else if(getGuess === pickWord){
		return showAnswerAndCongragulatePlayer();
	}
	//need to resolve the delay between correctLetters pushing and analyzing
	else if(correctLetters.join('') === pickWord){
		return showAnswerAndCongragulatePlayer();
	}
	console.log(getGuess,correctLetters,incorrectLetters);
	return updateGameState(getGuess,true);
}

//Added sideeffects :(
	//Will review upon completion of prototype
	//May be able to simply invoke the showPlayerProgress function
const updateGameState = function(letter,truthiness){
	if(truthiness === false){
		return incorrectLetters.push(letter);
	}
	else if(truthiness === true){
		return correctLetters.push(letter);
	}
	console.log(correctLetters,incorrectLetters);
	return showPlayerProgress(incorrectLetters,correctLetters);
}

//Need to check why prompts are being continually generated
	//answer may lie in the usage of the bind method - need to investigate further
function startGame(){
	//use incorrectLetters.length to keep track of the number of guesses made
	while(guessed === false && incorrectLetters.length < 6){
		checkGuess();
	}
	if(incorrectLetters.length === 6){
		return gameOver();
	}
}

//draw on canvas? Alternative would be to have a global string structure
const showPlayerProgress = function(incorrectLetters,correctLetters){
	//canvas setup
	let canvas = document.getElementById('canvas');
	let context = canvas.getContext('2d');

	context.fillText(incorrectLetters.join(' '),50,50);
	context.fillText(correctLetters.join(' '),100,100);

}

const showAnswerAndCongragulatePlayer = function(){
	guessed = true;
	return window.alert('You Won!');
}

const gameOver = function(){
	return window.alert('SAD!')
}


startGame();
