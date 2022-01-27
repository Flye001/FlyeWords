const apiLinkBase = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const word = "dance";
const ErrorMessage = document.getElementById("error-msg");
let CurrentGuess = 1;

function SubmitGuess() {
    ErrorMessage.style.visibility = "hidden";
    const guessInput = document.getElementById("guess-value");
    const guess = guessInput.value.toLowerCase();
    const guessButton = document.getElementById("guess-button");

    if (guess.length !== 5) return;

    if (!checkWord(guess)) {
        showError("This is not a word!");
        return;
    }

    UpdateRow(CurrentGuess, guess);
    CurrentGuess ++;
    guessInput.value = "";

    if (CurrentGuess > 5 || guess === word) {
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
            txt.classList.remove("bg-gray-400");
            txt.classList.add("bg-green-500");
        }
        else if (word.includes(c)) {
            txt.classList.remove("bg-gray-400");
            txt.classList.add("bg-orange-500");
        }

        row ++;
    }

}

function checkWord(wordToCheck)
{
    const url = apiLinkBase + wordToCheck
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    const resp = JSON.parse(xmlHttp.responseText)
    if (resp[0] === undefined) return false;
    else return true;
}

function showError(errorText) {
    ErrorMessage.textContent = errorText;
    ErrorMessage.style.visibility = "visible";
}