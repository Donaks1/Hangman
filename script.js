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
        checkWin(correctWord, typedText);
        checkLetters(correctWord, typedText, row);

        row++;
        position = 0;
        typedText = '';
    }
    

    let testdiv = document.getElementById("test");
    testdiv.textContent = typedText;
});

function isWord(word) {
    return true;
}

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
        }
        else if (correctWord.toUpperCase().includes(typedText[i].toUpperCase())) {
            cell.style.backgroundColor = "orange";
        }
        else {
            // Incorrect letter
            cell.style.backgroundColor = "grey";
        }
    }
}
