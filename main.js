// Shorthand for $( document ).ready()
$(function(){

    let userWord;
    let letterArr = [];
    let correctGuessArr = [];
    let wordFieldDiv = $('#wordField');
    let userInputDiv = $('#userInput');
    let gameBoard = $('#gameBoard');
    let gameStarted = false;
    let button = $('button');
    // Creates an array with the letters of the alphabet
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let guessCounter = 0;

    // Create letterholder based on length of word
    function createLetterHolders(userWord) {
        for(let i = 0; i < userWord.length; i++) {
            // Store each letter in letterArr
            letterArr.push(userWord[i]);
            // Append div with 2 els, p & div to the wordFieldDiv
            wordFieldDiv.append(`<div class="letterHolder">
                <p class="letter">${userWord[i]}</p><div class="dash"></div>
                </div>`);
        }
    }

    // Create alphabet board for user letter guess
    function createAlphabetBoard(){
        // Clear current elements in div
        userInputDiv.html("");
        for(let i in alphabet) {
            let span = $('<span></span>');
            span.text(alphabet[i].toUpperCase());
            userInputDiv.append(span);
        }
    }

    // Check userGuess against inputWord
    function checkUserGuess(userGuess){
        // If userGuess is in the userWord run loop
        if(userWord.indexOf(userGuess)!== -1){
            for(let i in letterArr) {
                if(userGuess === letterArr[i]) {
                    correctGuessArr.push(letterArr[i]);
                    $(`.letter`).eq(i).css("color", "black");
                }
            }
        }
        // Else add 1 to guessCounter
        else {
            guessCounter++;
        }
    }

    // Onclick set userWord to input value, then clear field
    button.click(function(){
        // Set userWord equal to the value of user input
        userWord = $('input[name=word]').val().toUpperCase();

        createLetterHolders(userWord);
        createAlphabetBoard();
    });

    // Add an onclick function to the span that is dynamically created
    $(document).on('click', 'span', (function(){
        checkUserGuess($(this).text());
        // Remove span after its been clicked on
        $(this).remove();
        console.log(guessCounter);
        console.log(correctGuessArr);
        if((guessCounter === 5) || (correctGuessArr.length === letterArr.length)) {
            prompt("Game Over!");

        }
    }));


});
