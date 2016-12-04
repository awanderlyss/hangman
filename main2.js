// Shorthand for $( document ).ready()
$(function(){
    // Declare variables
    let inputWord;

    let alphabet = $('#alphabet');
    let scoreboard = $('#scoreboard');
    let initial = $('#initial');
    let input = $('#input');
    let hangman = $('#hangman');
    let inputField = $('input[name=word]');
    let wordField = $('#wordField');
    let gameStarted = false;

    let gameImgs = ['<img src="img/player-one-win.png">',
        '<img src="img/img5.png">',
        '<img src="img/img4.png">',
        '<img src="img/img3.png">',
        '<img src="img/img2.png">',
        '<img src="img/img1.png">',
        '<img src="img/start.png">',
        '<img src="img/player-two-win.png">'
    ];



    function setup(){
        //Clear dynamically created els from html
        wordField.html('');
        alphabet.html('');

        hangman.html(gameImgs[6]);

        scoreboard.hide();
        alphabet.hide();
        input.hide();
        initial.show();

    }

    setup();

    // Create letterholder based on length of word
    function createLetterHolders(inputWord) {
        for(let i = 0; i < inputWord.length; i++) {
            // Append div with 2 els, p & div to the word
            wordField.append(`<div class="letter-holder">
                <p class="letter">${inputWord[i]}</p><div class="dash"></div>
                </div>`);
            $('.letter').hide();

        }// for loop
    }// end createLetterHolders func

    // Create alphabet board for user letter guess
    function createalphabet(){
        // Creates an array with the letters of the alphabet
        let letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
        for(let i in letters) {
            alphabet.append($(`<div class="alphabet">
                <p>${letters[i].toUpperCase()}</p>
                </div>`));
        }// for loop func
    }// end createalphabet

    // Create gameBoard once user submits a value word
    function createGameBoard(){
        // Store the value set to uppercase, spilt into arr in var
        inputWord = inputField.val().toUpperCase().split('');
        // Test the len of inputWord to check valid
        if(inputWord.length > 3){
            input.hide();
            createLetterHolders(inputWord);
            createalphabet();
            alphabet.show();
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
            hangman.html(gameImgs[guessBank]);
        }//end else sta
    }// end checkUserGuess func

    //Check to see if the game is over, declare a winner
    function checkEndGame(guessBank) {
        if (guessBank === 0){
            $('.instructions').eq(0).text('Player 1 has defeated Player 2!');
            $('.letter').show();
        }// end if sta
        else {
            $('.instructions').eq(0).text('Player 2 has defeated Player 1!');
        }// end else if sta
        alphabet.html('');
        scoreboard.html('');
        // Append a button to hangman div

    }//end checkEndGame func

    $('button').click(function(){
        if($(this).attr('id') === 'start'){
            initial.hide();
            input.show();
            guessBank = 6;
            correctBank = 0;
        }// end if sta
        else {
            createGameBoard();
            inputField.val('');
        }// end else sta
    });// end -> func, onclick

    // Add onclick func to div that is dynamic created
    $(document).on('click', '#alphabet div', (function(){
        checkUserGuess($('p', this).text(), $(this));
        console.log("guess", guessBank);
        console.log(correctBank);
        if ((guessBank === 0) || (correctBank === inputWord.length)){
            checkEndGame(guessBank);
        }//end if st
    }));// end --> func, func, onclick

    $(document).on('click', '#startNewGame', (function(){
        setup();

    }));// end --> func, func, onclick
    console.log()
});// end document.ready
