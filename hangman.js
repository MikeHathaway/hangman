window.alert('We\'re in Business?');

//My implementation of the game of hangman.

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
	else if(correctLetters.join('') + getGuess === pickWord){
		return showAnswerAndCongragulatePlayer();
	}
	return updateGameState(getGuess,true);
}


const updateGameState = function(letter,truthiness){
	if(truthiness === false){
		return incorrectLetters.push(letter);
	}
	else if(truthiness === true){
		return correctLetters.push(letter);
	}
	return showPlayerProgress(incorrectLetters,correctLetters);
}

function startGame(){
	//use incorrectLetters.length to keep track of the number of guesses made
	while(guessed === false && incorrectLetters.length < 6){
		checkGuess();
	}
	if(incorrectLetters.length === 6){
		return gameOver();
	}
}

const showAnswerAndCongragulatePlayer = function(){
	guessed = true;
	return window.alert('You Won!');
}

const gameOver = function(){
	return window.alert('SAD!')
}

//Draw latest gamestate on canvas
const showPlayerProgress = function(incorrectLetters,correctLetters){
	//canvas setup
	let canvas = document.getElementById('canvas');
	let context = canvas.getContext('2d');

	context.fillStyle = 'Black';

	context.fillText(incorrectLetters.join(''),50,50);
	context.fillText(correctLetters.join(''),100,100);

}

//clears the canvas so latest game state can be drawn
const clearCanvas = function(){
	let canvas = document.getElementById('canvas');
	let context = canvas.getContext('2d');

	return context.clearRect(0,0,canvas.width,canvas.height);
}

//function call that starts the game
startGame();
