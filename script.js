// document.getElementById("startbutton").addEventListener("click", fetchWord)

let correctWord = ''; // Declare correctWord globally

async function fetchWord() {
    const apiURL = "https://random-word-api.herokuapp.com/word?length=5";

    const response = await fetch(apiURL);

    const data = await response.json();

    const word = data[0];
    correctWord = word; // Assign the word to the global correctWord
    return word;
}

fetchWord().then((word) => {
    let outputDiv1 = document.getElementById("test2");
    outputDiv1.textContent = word;
});

async function checkWord(typedText) {

    const apiURL2 = "https://api.dictionaryapi.dev/api/v2/entries/en/" + typedText;

    const response = await fetch(apiURL2);

    const data = await response.json();

    return data;
}

// checkWord().then((data) => {
//     let result = data.title;
//     if (result === "No Definitions Found") {
//         alert("not a real word :(");
//     }
// });





const toHide = document.querySelectorAll(".hidden");
const hideButton = document.getElementById("startbutton");

hideButton.addEventListener("click", function() { 
    toHide.forEach(element => {
        element.style.display="none";
    });
});




let typedText = ''; // Variable to store the typed text
let row = 1;
let position = 0;
let outputName = "output";

// Add a keydown event listener to the document
document.addEventListener('keydown', (event) => {
    // Check for special keys like Backspace or Enter
    if (event.key === 'Backspace') {
        typedText = typedText.slice(0, -1); // Remove the last character
        outputName = "output" + row + position; // Update the outputName dynamically
        let outputDiv = document.getElementById(outputName)
        outputDiv.textContent = '';
        position--;
    } 
    else if (event.key.length === 1 && position < 5) { // Only process printable characters
        typedText += event.key.toUpperCase(); // Append the key pressed to the text
        position++;
        outputName = "output" + row + position; // Update the outputName dynamically

        // Check if the div exists, create it if it doesn't
        let outputDiv = document.getElementById(outputName);
        
        // Update the output div
        let lastLetter = typedText[typedText.length - 1];
        outputDiv.textContent = lastLetter;

    }
    else if (event.key === 'Enter' && position === 5) {
        checkWord(typedText).then((data) => {
            if (data.title === "No Definitions Found") {
                alert("Not a real word :(");
            } 
            else {
                checkWin(correctWord, typedText);
                checkLetters(correctWord, typedText, row);
                
                row++;
                position = 0;
                typedText = '';
            }
        });
    }
    

    let testdiv = document.getElementById("test");
    testdiv.textContent = typedText;
});

function checkWin(correctWord, typedText) {
    if (typedText.toUpperCase() === correctWord.toUpperCase()) {

        alert("You guessed the correct word!");
        return true;
    }
    return false;
}

function checkLetters(correctWord, typedText, row) {
    for (let i=0; i<5; i++) {
        let outputName = "output" + row + (i+1)
        let cell = document.getElementById(outputName)
        if (typedText[i].toUpperCase() === correctWord[i].toUpperCase()){
            cell.style.backgroundColor = "green";
            updateKeyboard(typedText[i].toUpperCase(),"green");
        }
        else if (correctWord.toUpperCase().includes(typedText[i].toUpperCase())) {
            cell.style.backgroundColor = "orange";
            updateKeyboard(typedText[i].toUpperCase(),"orange");
        }
        else {
            // Incorrect letter
            cell.style.backgroundColor = "grey";
            updateKeyboard(typedText[i].toUpperCase(),"grey");
        }
    }
}

function updateKeyboard (letter, colour) {
    let letterId = letter.toLowerCase();
    let keyToChange = document.getElementById(letterId);
    if (colour === "green") {
    keyToChange.style.backgroundColor = "green"; 
    }
    else if (colour === "orange") {
        keyToChange.style.backgroundColor = "orange"; 
    }
    else if (colour === "grey") {
        keyToChange.style.backgroundColor = "black"; 
        keyToChange.style.color= "grey";
    }
}

const aButton = document.getElementById("a");
const bButton = document.getElementById("b");
const cButton = document.getElementById("c");
const dButton = document.getElementById("d");
const eButton = document.getElementById("e");
const fButton = document.getElementById("f");
const gButton = document.getElementById("g");
const hButton = document.getElementById("h");
const iButton = document.getElementById("i");
const jButton = document.getElementById("j");
const kButton = document.getElementById("k");
const lButton = document.getElementById("l");
const mButton = document.getElementById("m");
const nButton = document.getElementById("n");
const oButton = document.getElementById("o");
const pButton = document.getElementById("p");
const qButton = document.getElementById("q");
const rButton = document.getElementById("r");
const sButton = document.getElementById("s");
const tButton = document.getElementById("t");
const uButton = document.getElementById("u");
const vButton = document.getElementById("v");
const wButton = document.getElementById("w");
const xButton = document.getElementById("x");
const yButton = document.getElementById("y");
const zButton = document.getElementById("z");
const backspaceButton = document.getElementById("backspace");
const enterButton = document.getElementById("enter");

backspaceButton.addEventListener("click", function() {
    typedText = typedText.slice(0, -1); 
    outputName = "output" + row + position;
    let outputDiv = document.getElementById(outputName);
    outputDiv.textContent = '';
    position--;
});

enterButton.addEventListener("click", function () {
    checkWord(typedText).then((data) => {
        if (data.title === "No Definitions Found") {
            alert("Not a real word :(");
        } 
        else {
            checkWin(correctWord, typedText);
            checkLetters(correctWord, typedText, row);
            updateKeyboard(typedText);
            row++;
            position = 0;
            typedText = '';
            
        }
    });
});

aButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "A";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "A";
    }
});

bButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "B";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "B";
    }
});

cButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "C";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "C";
    }
});

dButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "D";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "D";
    }
});

eButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "E";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "E";
    }
});

fButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "F";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "F";
    }
});

gButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "G";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "G";
    }
});

hButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "H";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "H";
    }
});

iButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "I";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "I";
    }
});

jButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "J";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "J";
    }
});

kButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "K";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "K";
    }
});

lButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "L";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "L";
    }
});

mButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "M";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "M";
    }
});

nButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "N";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "N";
    }
});

oButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "O";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "O";
    }
});

pButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "P";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "P";
    }
});

qButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "Q";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "Q";
    }
});

rButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "R";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "R";
    }
});

sButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "S";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "S";
    }
});

tButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "T";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "T";
    }
});

uButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "U";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "U";
    }
});

vButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "V";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "V";
    }
});

wButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "W";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "W";
    }
});

xButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "X";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "X";
    }
});

yButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "Y";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "Y";
    }
});

zButton.addEventListener("click", function() {
    if (position < 5) {
        typedText += "Z";
        position++;
        outputName = "output" + row + position;
        let outputDiv = document.getElementById(outputName);
        outputDiv.textContent = "Z";
    }
});

let lastTouchEnd = 0;

document.addEventListener('touchend', (event) => {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

