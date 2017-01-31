window.alert('We\'re in Business?');

//My implementation of the game of hangman.
//I have attempted to implement this in the functional style

//Global data structures
let incorrectLetters = [];
let correctLetters = [];
let guessed = false;


//prompts the user to pick an intitial word.
const pickWord = function(){
	return prompt('Pick a word!');
}


const setupAnswerArray = function(){
	return pickWord().toLowerCase().split('');
}

//console.log(pickWord());
//console.log(setupAnswerArray());

const getGuess = function(){
	return prompt('Guess a letter or word:')
}

const checkGuess = function(){
	if(setupAnswerArray().indexOf(getGuess()) === -1 && getGuess() !== setupAnswerArray().join('')){
		updateGameState(getGuess(),false);
		return window.alert('WRONG');
	}
	else if(getGuess() === pickWord()){
		return showAnswerAndCongragulatePlayer();
	}
	return updateGameState(getGuess(),true);
}

//Added sideeffects :(
	//Will review upon completion of prototype
	//May be able to simply invoke the showPlayerProgress function
const updateGameState = function(letter,truthiness){
	if(truthiness === false){
		incorrectLetters.push(letter);
	}
	else if(truthiness === true){
		correctLetters.push(letter);
	}

	return showPlayerProgress(incorrectLetters,correctLetters);
}

function startGame(){
	pickWord();

	while(guessed === false){
		checkGuess();
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

startGame();
