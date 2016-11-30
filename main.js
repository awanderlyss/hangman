// Shorthand for $( document ).ready()
$(function(){

    let inputWord;
    let correctGuessArr = [];
    let wordField = $('#wordField');
    let input = $('#input');
    let gameBoard = $('#gameBoard');
    let beginGame = $('#beginGame');
    let alphabetBoard = $('#alphabetBoard');
    let inputField = $('input[name=word]');
    let hangmanImg = $('#hangmanImg');
    let gameStarted = false;
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
    $('button').click(function(){
        // Set inputWord equal to the value of user input
        if($(this).attr('id') === 'start'){
            beginGame.css("display", "none");
            input.css("display", "block");
        }
        else {
            inputWord = inputField.val().toUpperCase().split('');
            if(inputWord.length !== 0){
                input.css("display", "none");
                inputField.val("");
                createLetterHolders(inputWord);
                createAlphabetBoard();
            }
            else {
                inputField.val('*Please enter a valid word!');
                inputField.css("border", "1px red solid");
            }
        }
    });

    inputField.click(function(){
        inputField.val("");
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
            alphabetBoard.html("");
            beginGame.css("display", "block");
            $('p').text("It looks like you were defeated by Player 1!");
            $('#start').text("Start New Game");
            hangmanImg.append($('<img src="img/gameover.png" class="gameover">'));

        }

    }));



});
