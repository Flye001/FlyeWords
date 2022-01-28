const apiLinkBase = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let word = "";
const ErrorMessage = document.getElementById("error-msg");
const guessButton = document.getElementById("guess-button");
const guessInput = document.getElementById("guess-value");
let CurrentGuess = 1;

const skipWordCheck = false;

// Pick a word

fetch('words.txt')
    .then(response => response.text())
    .then((data) => {
        //console.log(data);
        const myArray = data.split("\n");
        word = myArray[Math.floor(Math.random() * myArray.length)].toLowerCase().trim();
        console.log("The word is " + word);
    });


function SubmitGuess() {
    ErrorMessage.style.visibility = "hidden";

    const guess = guessInput.value.toLowerCase();

    if (guess.length !== 5) return;

    if (!checkWord(guess)) {
        showError("This is not a word!");
        guessButton.style.visibility = "visible";
        return;
    }

    UpdateRow(CurrentGuess, guess);
    CurrentGuess++;
    guessInput.value = "";

    if (CurrentGuess > 5) {
        guessInput.style.visibility = "hidden";
        guessButton.style.visibility = "hidden";
        showError("The word was " + word);
    }
    else if (guess === word) {
        guessInput.style.visibility = "hidden";
        guessButton.style.visibility = "hidden";
    }
}

function UpdateRow(rowNum, guess) {
    if (guess.length !== 5) return;

    let row = 1
    for (const c of guess) {
        const elemId = "r" + rowNum + "c" + row;
        const txt = document.getElementById(elemId);

        txt.children[0].textContent = c;

        if (word.charAt(row - 1) === c) {
            //txt.classList.remove("letter-container");
            txt.classList.add("green");
        }
        else if (word.includes(c)) {
            //txt.classList.remove("letter-container-orange");
            txt.classList.add("orange");
        }

        row++;
    }

}

function checkWord(wordToCheck) {
    if (skipWordCheck) return true;

    const url = apiLinkBase + wordToCheck
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    const resp = JSON.parse(xmlHttp.responseText)
    console.log(resp);
    if (resp[0] === undefined) return false;
    else return true;
}

function showError(errorText) {
    ErrorMessage.textContent = errorText;
    ErrorMessage.style.visibility = "visible";
}