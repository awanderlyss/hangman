// Shorthand for $( document ).ready()
$(function(){
    // Declare variables
    let alphabetBoard = $('#alphabetBoard');
    let guessBoard = $('#guessBoard');
    let initialStart = $('#initialStart');
    let input = $('#input');
    let inputField = $('input[name=word]');
    let wordField = $('#wordField');
    let aside = $('aside');
    let inputWord;

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

    $('button').click(function(){
        if($(this).attr('id') === 'start'){
            initialStart.hide();
            input.show();
        }// end if statement
        else {
            createGameBoard();
        }// end else statement
    });// end -> function, button click

    $(document).on('click', '#alphabetBoard div', (function(){
        let letterPicked = $(this).text();
        guessBoard.append($(this));

    }));

});// end document.ready
