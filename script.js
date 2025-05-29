// Mind Reader Game, Using DOM & Binary BITS


// Card patterns based on binary representation

const cardPatterns = [
    // Card 1: Numbers with bit 0 set (right-most bit)
    [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63],

    // Card 2: Numbers with bit 1 set
    [2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30, 31, 34, 35, 38, 39, 42, 43, 46, 47, 50, 51, 54, 55, 58, 59, 62, 63],

    // Card 3: Numbers with bit 2 set
    [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55, 60, 61, 62, 63],

    // Card 4: Numbers with bit 3 set
    [8, 9, 10, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28, 29, 30, 31, 40, 41, 42, 43, 44, 45, 46, 47, 56, 57, 58, 59, 60, 61, 62, 63],

    // Card 5: Numbers with bit 4 set
    [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63],

    // Card 6: Numbers with bit 5 set
    [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63]
];

let currentCardIndex = 0;
let guessedNumber = 0;

// DOM elements
const introScreen = document.getElementById('intro-screen');
const gameContainer = document.querySelector('.game-container');
const cardDisplay = document.querySelector('.card-display');
const cardNumber = document.querySelector('.card-number');
const numbersGrid = document.getElementById('grid');
const resultContainer = document.getElementById('result-container');
const resultDisplay = document.getElementById('result');
const progressBar = document.querySelector('.progress-bar');

// Start button event
document.getElementById('start-button').addEventListener('click', startGame);

// Play again button event
document.getElementById('play-again').addEventListener('click', resetGame);

function startGame() {
    introScreen.style.display = 'none';
    gameContainer.style.display = 'flex';
    showCard(0);
}

function showCard(index) {
    // Update progress bar
    let progress = (index / 6) * 100;
    progressBar.style.width = `${progress}%`;

    if (index >= cardPatterns.length) {
        showResult();
        return;
    }

    currentCardIndex = index;
    cardNumber.textContent = index + 1;

    // Clear previous numbers
    numbersGrid.innerHTML = '';

    // Add numbers to grid
    cardPatterns[index].forEach(num => {
        const numElement = document.createElement('div');
        numElement.className = 'number';
        numElement.textContent = num;
        numbersGrid.appendChild(numElement);
    });

    // Add button events
    const yesBtn = document.querySelector('.yes-btn');
    const noBtn = document.querySelector('.no-btn');

    yesBtn.onclick = () => {
        // Add the value for this card to our guess
        guessedNumber += Math.pow(2, currentCardIndex);
        showCard(currentCardIndex + 1);
    };

    noBtn.onclick = () => {
        // Don't add anything, just move to next card
        showCard(currentCardIndex + 1);
    };
}

function showResult() {
    gameContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    resultDisplay.textContent = guessedNumber;
}

function resetGame() {
    currentCardIndex = 0;
    guessedNumber = 0;
    resultContainer.style.display = 'none';
    progressBar.style.width = '0%';
    introScreen.style.display = 'block';
}
