
// DOM element references
const hangmanImage = document.querySelector(".hangmanContainer img");
const keyboard = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".wordDisplay");
const guesses = document.querySelector(".guesses");
const gameModal = document.querySelector(".gameModal");
const playAgainBtn = document.querySelector(".playAgainBtn");

// Game variables
let currentWord, wrongGuessCount, correctLetters;
let maxGuesses = 6;



// Reset the game to its initial state
const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `./assets/images/hang-${wrongGuessCount}.png`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
    keyboard.querySelectorAll("button").forEach(btn => {
        btn.disabled = false;
        btn.style.backgroundColor = '';
    }); 
    guesses.innerHTML=`<span>🩶</span><span>/🩶</span><span>/🩶</span><span>/🩶</span><span>/🩶</span><span>/🩶</span>`

};




// Function to initialize the game based on clicked letter
const initGame = (button, clickedLetter) => {
    button.disabled = true;
    const clickedLetterLower = clickedLetter.toLowerCase();
    const currentWordLower = currentWord.toLowerCase();

    if (currentWordLower.includes(clickedLetterLower)) {
        button.style.backgroundColor = 'green';
        [...currentWord].forEach((letter, index) => {
            const letterLower = letter.toLowerCase();
            if (letterLower === clickedLetterLower) {
                correctLetters.push(letter);
                const letterElements = wordDisplay.querySelectorAll("li");
                letterElements[index].innerText = letter;
                letterElements[index].classList.add("guessed");
            }
        })
    } else {
        button.style.backgroundColor = 'red';
        wrongGuessCount++;
        hangmanImage.src = `./assets/images/hang-${wrongGuessCount}.png`;

        if (wrongGuessCount === maxGuesses) {
            gameOver(false);
        keyboard.querySelectorAll("button").forEach(btn => btn.disabled = true); // Disable all buttons
        return;

        } else {
             const emojisToRemove = guesses.querySelectorAll('span');
            if (emojisToRemove.length > 0) {
                emojisToRemove[emojisToRemove.length-1].remove();
            }
        }
    }
    
    if (correctLetters.length === currentWord.replace(/\s/g, '').length) {
        gameOver(true);
        return;
    }
};





// Creating buttons for each letter of the alphabet
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    const letter = String.fromCharCode(i);
    button.innerText = letter;
    keyboard.appendChild(button);
    addButtonListener(button, letter);
}



// Function to add event listener to each button
function addButtonListener(btn, clickedLetter) {
    btn.addEventListener("click", () => initGame(btn, clickedLetter));
}



// // Word list for the game
const hangmanWordList = [
    { word: "apple", hint: "A fruit" },
    { word: "banana", hint: "Another fruit" },
    { word: "elephant", hint: "A large mammal" },
    { word: "computer", hint: "An electronic device" },
    { word: "guitar", hint: "A musical instrument" },
    { word: "ocean", hint: "A large body of water" },
    { word: "mountain", hint: "A tall landform" },
    { word: "pizza", hint: "A popular food item" },
    { word: "robot", hint: "A machine designed to perform tasks" },
    { word: "sunflower", hint: "A type of flower" }
];



// Function to get a random word from the word list
const getRandomWord = () => {
    const { word, hint } = hangmanWordList[Math.floor(Math.random() * hangmanWordList.length)];
    currentWord = word;
    document.querySelector(".questions").innerText = hint;
    resetGame();
   
};



// Initial call to get a random word when the game starts
getRandomWord();



// Event listener for the "Play Again" button
playAgainBtn.addEventListener("click", getRandomWord, resetGame);




// Function to handle game over scenarios (victory or loss)
const gameOver = (isVictory) => {
    setTimeout(() => {
        if (isVictory) {
            gameModal.querySelector("img").src = `https://media4.giphy.com/media/BPJmthQ3YRwD6QqcVD/giphy.gif`;
            gameModal.querySelector("h4").innerText = `Congrats! You won!`;
        } else {
            gameModal.querySelector("img").src = 'https://media.tenor.com/Uj4RSxn_BTMAAAAM/game-over-glitch.gif'; // Provide an appropriate game over image
            gameModal.querySelector("h4").innerText = `Game Over!`;
        }
        gameModal.classList.add("show");
        keyboard.querySelectorAll("button").forEach(btn => btn.disabled = true); // Disable all buttons when game ends
    }, 300);
};




