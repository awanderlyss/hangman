// Shorthand for $( document ).ready()
$(function(){
    // Declare variables
    let inputWord;
    let guessBank = 6;
    let correctBank = 0;
    let alphabetBoard = $('#alphabetBoard');
    let guessBoard = $('#guessBoard');
    let initialStart = $('#initialStart');
    let input = $('#input');
    let hangman = $('#hangman');
    let inputField = $('input[name=word]');
    let wordField = $('#wordField');
    let aside = $('aside');
    let gameStarted = false;

    // Hide elements until needed
    aside.hide();
    input.hide();

    // Create letterholder based on length of word
    function createLetterHolders(inputWord) {
        for(let i = 0; i < inputWord.length; i++) {
            // Append div with 2 els, p & div to the wordField
            wordField.append(`<div class="letterHolder">
                <p class="letter">${inputWord[i]}</p><div class="dash"></div>
                </div>`);
            $('.letter').hide();

        }// for loop
    }// end createLetterHolders func

    // Create alphabet board for user letter guess
    function createAlphabetBoard(){
        // Creates an array with the letters of the alphabet
        let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        for(let i in alphabet) {
            alphabetBoard.append($(`<div class="alphabet">
                <p>${alphabet[i].toUpperCase()}</p>
                </div>`));
            // Show the aside els
            aside.show();
        }// for loop func
    }// end createAlphabetBoard

    // Create gameBoard once user submits a value word
    function createGameBoard(){
        // Store the value set to uppercase, spilt into arr in var
        inputWord = inputField.val().toUpperCase().split('');
        // Test the len of inputWord to check valid
        if(inputWord.length > 3){
            input.hide();
            createLetterHolders(inputWord);
            createAlphabetBoard();
        }// end if statement
    }// end createGameBoard func

    // Check userGuess against inputWord arr
    function checkUserGuess(letterPicked, divClicked){
        if(inputWord.indexOf(letterPicked)!== -1){
            for(let i in inputWord){
                if(letterPicked === inputWord[i]) {
                    $('.letter').eq(i).show();
                    correctBank++;
            }}// end --> if sta, for loop
            divClicked.remove();
        }// if sta
        else {
            guessBank--;
            guessBoard.append(divClicked);
        }//end else sta
    }// end checkUserGuess func

    //Check to see if the game is over, declare a winner
    function checkEndGame(guessBank, correctBank) {
        if (guessBank === 0){
            hangman.append('<p>Player 1 has defeated Player 2!</p>');
            $('.letter').show();
            hangman.append('<button type="button" id="startNewGame">Start New Game</button>');
        }// end if sta
        else if (correctBank === inputWord.length){
            hangman.append('<p>Player 2 has defeated Player 1!</p>');
            hangman.append('<button type="button" id="startNewGame">Start New Game</button>');
        }// end else if sta
        // Append a button to hangman div

    }//end checkEndGame func

    $('button').click(function(){
        if($(this).attr('id') === 'start'){
            initialStart.hide();
            input.show();
        }// end if statement
        else {
            createGameBoard();
        }// end else statement
    });// end -> func, onclick

    // Add onclick func to div that is dynamic created
    $(document).on('click', '#alphabetBoard div', (function(){
        checkUserGuess($('p', this).text(), $(this));

        checkEndGame(guessBank, correctBank);

    }));// end --> func, func, onclick

});// end document.ready
