// document.getElementById("startbutton").addEventListener("click", fetchWord)

async function fetchWord() {
    const apiURL = "https://random-word-api.herokuapp.com/word?length=5";

    const response = await fetch(apiURL);

    const data =  await response.json();

    const word = data[0];

    console.log(word);
}

const toHide = document.querySelectorAll(".hidden");
const hideButton = document.getElementById("startbutton");

hideButton.addEventListener("click", function() { 
    toHide.forEach(element => {
        element.style.display="none";
    });
});




let typedText = ''; // Variable to store the typed text
let position = 0;
let outputName = "output";

// Add a keydown event listener to the document
document.addEventListener('keydown', (event) => {
    // Check for special keys like Backspace or Enter
    if (event.key === 'Backspace') {
        typedText = typedText.slice(0, -1); // Remove the last character
        outputName = "output" + position; // Update the outputName dynamically
        let outputDiv = document.getElementById(outputName)
        outputDiv.textContent = '';
        position--;


    } else if (event.key === 'Enter' && position===3) {
        let outputDiv = document.getElementById(outputName)
        outputDiv.style.backgroundColor = 'green';

        
    } else if (event.key.length === 1 && position < 5) { // Only process printable characters
        typedText += event.key; // Append the key pressed to the text
        position++;
        outputName = "output" + position; // Update the outputName dynamically

        // Check if the div exists, create it if it doesn't
        let outputDiv = document.getElementById(outputName);
        
        // Update the output div
        let lastLetter = typedText[typedText.length - 1];
        outputDiv.textContent = lastLetter;
    }
    let testdiv = document.getElementById("test");
    testdiv.textContent = typedText;
});

fetchWord();