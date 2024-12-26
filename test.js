

async function fetchWord() {
    const apiURL = "https://random-word-api.herokuapp.com/word?length=5";

    const response = await fetch(apiURL);

    const data = await response.json();

    const word = data[0];
    return word;
}

fetchWord().then((word) => {
    console.log(word);
});

async function checkWord() {
    const apiURL2 = "https://api.dictionaryapi.dev/api/v2/entries/en/ballarfygt";

    const response = await fetch(apiURL2);

    const data = await response.json();

    return data;
}

checkWord().then((data) => {
    console.log(data);
    console.log(data.title);
});

// async function isRealWord(word) {
//     const result = await checkWord(word);
//     return result.isValid;
// }

// Usage:
// const word = 'ball';
// isRealWord(word).then(isValid => {
//     console.log(isValid ? `${word} is a real word` : `${word} is not a real word`);
// });
