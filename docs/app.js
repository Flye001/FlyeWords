const apiLinkBase = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let word = "";
let allWord;
const ErrorMessage = document.getElementById("error-msg");
const guessForm = document.getElementById("guess-form");
const guessInput = document.getElementById("guess-value");
const playAgain = document.getElementById("play-again");
let CurrentGuess = 1;

const skipWordCheck = false;

// Pick a word

fetch("all-words.txt")
    .then(response => response.text())
    .then((data) => {
        allWord = data;
        ChoseWord();
    });

function ChoseWord() {
    fetch('words.txt')
    .then(response => response.text())
    .then((data) => {
        const myArray = data.split("\n");
        word = myArray[Math.floor(Math.random() * myArray.length)].toUpperCase().trim();

        if (!allWord.includes(word.toLowerCase())) {
            console.log("Word is invalid: " + word);
            ChoseWord();
        }
        else {
            console.log("The word is " + word);
            guessForm.style.visibility = "visible";
        }
            
    });
}

function SubmitGuess() {
    ErrorMessage.style.visibility = "hidden";

    const guess = guessInput.value.toUpperCase();

    if (guess.length !== 5) return;

    if (!checkWord(guess)) {
        showError("This is not a word!");
        return false;
    }

    UpdateRow(CurrentGuess, guess);
    CurrentGuess++;
    guessInput.value = "";
    
    if (guess === word) {
        guessForm.style.display = "none";
        playAgain.style.display = "block";
    }
    else if (CurrentGuess > 5) {
        //guessForm.style.visibility = "hidden";
        guessForm.style.display = "none";
        showError("The word was " + word);
        playAgain.style.display = "block";
    }
}

function UpdateRow(rowNum, guess) {
    if (guess.length !== 5) return;

    let tempWord = word;
    let tempGuess = guess;

    let row = 1
    for (const c of guess) {
        const elemId = "r" + rowNum + "c" + row;
        const txt = document.getElementById(elemId);

        txt.children[0].textContent = c;

        if (tempWord.charAt(row - 1) === c) {
            txt.classList.add("green");

            tempWord = tempWord.replaceAt(row - 1, "-");
            tempGuess = tempGuess.replaceAt(row - 1, "_");
        }

        row++;
    }

    row = 1
    for (const c of tempGuess) {
        const elemId = "r" + rowNum + "c" + row;
        const txt = document.getElementById(elemId);

        if (tempWord.includes(c)) {
            txt.classList.add("orange");

            tempWord = tempWord.replace(c, "-");
        }

        row++;
    }
}

function checkWord(wordToCheck) {
    if (skipWordCheck) return true;

    // const url = apiLinkBase + wordToCheck
    // const xmlHttp = new XMLHttpRequest();
    // xmlHttp.open("GET", url, false); // false for synchronous request
    // xmlHttp.send(null);
    // const resp = JSON.parse(xmlHttp.responseText)
    // console.log(resp);
    // if (resp[0] === undefined) return false;
    // else return true;

    if (allWord.includes(wordToCheck.toLowerCase())) return true;
    else return false;
}

function showError(errorText) {
    ErrorMessage.textContent = errorText;
    ErrorMessage.style.visibility = "visible";
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}