// Shorthand for $( document ).ready()
$(function(){

    let inputWord;
    let correctGuessArr = [];
    let wordField = $('#wordField');
    let input = $('#userInput');
    let gameBoard = $('#gameBoard');
    let alphabetBoard = $('#alphabetBoard');
    let gameStarted = false;
    let button = $('button');
    let guessAmt = 5;

    // Create letterholder based on length of word
    function createLetterHolders(inputWord) {
        for(let i = 0; i < inputWord.length; i++) {
            // Append div with 2 els, p & div to the wordField
            wordField.append(`<div class="letterHolder">
                <p class="letter">${inputWord[i]}</p><div class="dash"></div>
                </div>`);
        }
    }

    // Create alphabet board for user letter guess
    function createAlphabetBoard(){
        // Clear current elements in div
        input.html("");
        // Creates an array with the letters of the alphabet
        let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        for(let i in alphabet) {
            let span = $('<span></span>');
            span.text(alphabet[i].toUpperCase());
            alphabetBoard.append(span);
        }
    }

    // Check userGuess against inputWord
    function checkUserGuess(userGuess){
        // If userGuess is in the inputWord run loop
        if(inputWord.indexOf(userGuess)!== -1){
            for(let i in inputWord) {
                if(userGuess === inputWord[i]) {
                    correctGuessArr.push(inputWord[i]);
                    $(`.letter`).eq(i).css("color", "black");
                }
            }
        }
        // Else subtract 1 from guessAmt
        else {
            guessAmt--;
        }
    }

    // Onclick set inputWord to input value, then clear field
    button.click(function(){
        // Set inputWord equal to the value of user input
        inputWord = $('input[name=word]').val().toUpperCase().split('');

        createLetterHolders(inputWord);
        createAlphabetBoard();
    });

    // Add an onclick function to the span that is dynamically created
    $(document).on('click', 'span', (function(){
        checkUserGuess($(this).text());
        // Remove span after its been clicked on
        $(this).remove();
        console.log(guessAmt);
        console.log(correctGuessArr);

        // When guessCounter = 0 game is over game is erased, img displayed
        if(guessAmt === 0) {
            gameBoard.html("");
            gameBoard.append($('<img src="img/gameover.png" class="gameover">'));

        }

    }));



});
