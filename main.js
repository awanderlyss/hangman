// Shorthand for $( document ).ready()
$(function(){

    let inputWord;
    let correctGuessArr = [];
    let wordField = $('#wordField');
    let input = $('#input');
    // Hide the input div until called to show
    input.hide();

    let gameBoard = $('#gameBoard');
    let beginGame = $('#beginGame');
    let alphabetBoard = $('#alphabetBoard');
    let inputField = $('input[name=word]');
    let hangman = $('#hangman');
    let gameStarted = false;
    let guessAmt = 6;

    // Create letterholder based on length of word
    function createLetterHolders(inputWord) {
        for(let i = 0; i < inputWord.length; i++) {
            // Append div with 2 els, p & div to the wordField
            wordField.append(`<div class="letterHolder">
                <p class="letter">${inputWord[i]}</p><div class="dash"></div>
                </div>`);
            $('.letter').hide();
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
                    $('.letter').eq(i).show();
                }
            }
        }
        // Else subtract 1 from guessAmt
        else {
            guessAmt--;
        }
    }

    function checkEndGame(guessAmt, correctGuessArr){
        // When guessCounter = 0 game is over gameBoard is erased
        if(guessAmt === 0) {
            for(let i = 0; i < inputWord.length; i++){
                console.log($('.letter').css('color') !== 'black');
                // if ($('.letter').css('color') === 'transparent') {
                //     $('.letter').css("color", "black");
                //     $('.letterHolder').css("border", "1px dash red");
                // }
            }
            $('p.instructions').html("It looks like you were defeated by Player 1!");
        }

        else if(correctGuessArr.length === inputWord.length) {
            $('p.instructions').html("It looks like Player 2 has defeated you!");
        }

        alphabetBoard.html('');
        beginGame.show();
        $('#start').html("Start New Game");
    }

    // Onclick set inputWord to input value, then clear field
    $('button').click(function(){
        // Set inputWord equal to the value of user input
        wordField.html('');
        if($(this).attr('id') === 'start'){
            beginGame.hide();
            input.show();
        }
        else {
            inputWord = inputField.val().toUpperCase().split('');
            if(inputWord.length !== 0){
                input.hide();
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
        inputField.css("border", "1px black solid");
    });

    // Add an onclick function to the span that is dynamically created
    $(document).on('click', 'span', (function(){
        checkUserGuess($(this).text());
        // Remove span after its been clicked on
        $(this).remove();
        console.log(guessAmt);
        console.log(correctGuessArr);

    }));



});
