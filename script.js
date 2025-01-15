const easyButton = document.getElementById("easyButton");
const hardButton = document.getElementById("hardButton");
const difficultyScreen = document.querySelectorAll(".difficulty-screen");
let correctWord = '';

async function fetchHardWord() {
    try {
        const apiURL = "https://random-word-api.herokuapp.com/word?length=5";
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const word = data[0];

        if (!word || word.length !== 5) {
            throw new Error('Invalid word received');
        }

        correctWord = word;
        return word;
    } catch (error) {
        console.error('Error fetching word:', error);
    }
}

hardButton.onclick = () => {
    difficultyScreen.forEach(element => {
        element.style.display = "none";
    });

    fetchHardWord().then((word) => {
        let outputDiv1 = document.getElementById("test2");
        outputDiv1.textContent = word;
    });
};

async function fetchNormalWord() {
    const totalWords = 3103;
    const response = await fetch("words.txt");
    const text = await response.text();
    const words = text.split(/\s+/);
    const randomIndex = Math.floor(Math.random() * totalWords);
    const word = words[randomIndex];

    document.getElementById("test1").textContent = word;
    correctWord = word;
    return correctWord;
}

easyButton.onclick = () => {
    difficultyScreen.forEach(element => {
        element.style.display = "none";
    });

    fetchNormalWord().then((word) => {
        let outputDiv = document.getElementById("test1");
        outputDiv.textContent = word;
    });
};

async function checkWord(typedText) {
    const apiURL2 = `https://api.dictionaryapi.dev/api/v2/entries/en/${typedText}`;
    const response = await fetch(apiURL2);
    const data = await response.json();
    return data;
}

const toHide = document.querySelectorAll(".title-screen");
const hideButton = document.getElementById("startbutton");

hideButton.addEventListener("click", function () {
    toHide.forEach(element => {
        element.style.display = "none";
    });
});

function enterPressed() {
    let currentRowClass = ".row" + row;
    let letterBoxes = document.querySelectorAll(currentRowClass);

    letterBoxes.forEach(element => {
        element.classList.add("box-flip");
        element.addEventListener("animationend", () => {
            element.classList.remove("box-flip");
        });
    });

    setTimeout(() => {
        if (checkWin(correctWord, typedText)) {
            return;
        } else {
            checkWord(typedText).then((data) => {
                if (data.title === "No Definitions Found") {
                    alert("Not a real word :(");
                } else {
                    checkWin(correctWord, typedText);
                    checkLetters(correctWord, typedText, row);
                    row++;
                    position = 0;
                    typedText = '';
                }
            });
        }
    }, 400);
}

let typedText = '';
let row = 1;
let position = 0;
let outputName = "output";

document.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
        typedText = typedText.slice(0, -1);
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = '';
        position--;
    } else if (event.key.length === 1 && position < 5) {
        typedText += event.key.toUpperCase();
        position++;
        outputName = "output" + row + position;

        let outputDiv = document.getElementById(outputName);
        let lastLetter = typedText[typedText.length - 1];
        outputDiv.textContent = lastLetter;
    } else if (event.key === 'Enter' && position === 5) {
        enterPressed();
    }
});

function checkWin(correctWord, typedText) {
    if (typedText.toUpperCase() === correctWord.toUpperCase()) {
        for (let i = 0; i < 5; i++) {
            let outputName = "output" + row + (i + 1);
            let cell = document.getElementById(outputName);
            cell.style.backgroundColor = "green";
            updateKeyboard(typedText[i].toUpperCase(), "green");
        }
        alert("afsrgf");
        let winScreen = document.getElementById("win-screen");
        winScreen.style.display = "flex";

        let displayedCorrectWord = document.getElementById("correct-word");
        displayedCorrectWord.textContent = correctWord.toUpperCase();

        return true;
    }
    return false;
}

function checkLetters(correctWord, typedText, row) {
    for (let i = 0; i < 5; i++) {
        let outputName = "output" + row + (i + 1);
        let cell = document.getElementById(outputName);
        if (typedText[i].toUpperCase() === correctWord[i].toUpperCase()) {
            cell.style.backgroundColor = "green";
            updateKeyboard(typedText[i].toUpperCase(), "green");
        } else if (correctWord.toUpperCase().includes(typedText[i].toUpperCase())) {
            cell.style.backgroundColor = "orange";
            updateKeyboard(typedText[i].toUpperCase(), "orange");
        } else {
            cell.style.backgroundColor = "#808080";
            updateKeyboard(typedText[i].toUpperCase(), "grey");
        }
    }
}

function updateKeyboard(letter, colour) {
    let letterId = letter.toLowerCase();
    let keyToChange = document.getElementById(letterId);
    if (colour === "green") {
        keyToChange.style.backgroundColor = "green";
    } else if (colour === "orange") {
        keyToChange.style.backgroundColor = "orange";
    } else if (colour === "grey") {
        keyToChange.style.backgroundColor = "rgb(43, 43, 43)";
        keyToChange.style.color = "white";
    }
}

const keyboardButtons = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "backspace", "enter"];

keyboardButtons.forEach(key => {
    const button = document.getElementById(key);

    if (key === "backspace") {
        button.addEventListener("click", function () {
            typedText = typedText.slice(0, -1);
            outputName = "output" + row + position;
            let outputDiv = document.getElementById(outputName);
            outputDiv.textContent = '';
            position--;
        });
    } else if (key === "enter") {
        button.addEventListener("click", function () {
            if (position === 5) {
                enterPressed();
            }
        });
    } else {
        button.addEventListener("click", function () {
            if (position < 5) {
                typedText += key.toUpperCase();
                position++;
                outputName = "output" + row + position;
                let outputDiv = document.getElementById(outputName);
                outputDiv.textContent = key.toUpperCase();
            }
        });
    }
});
