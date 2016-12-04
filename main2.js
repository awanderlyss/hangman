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
        '<img src="img/player-two-win.png">'];

    function setup(){
        if(gameStarted){
            //Clear dynamically created els from html
            wordField.html('');
            alphabet.html('');
            inputField.val('');
            initial.hide();
        }
        else {
            input.hide();
        }
        guessBank = 6;
        correctBank = 0;
        hangman.html(gameImgs[6]);
        wordField.hide();
        alphabet.hide();
    }

    // Validate the user word
    function validate(inputWord) {
      if (inputWord.length <=3) {
          alert("Please enter a longer word!");
          return false;
      }
      else if (!/^[a-zA-Z]*$/g.test(inputWord)) {
          alert("Please enter valid characters!");
          return false;
      }
      else {
        return true;
      }
    }

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
        }// for loop
    }// end createalphabet

    // Create gameBoard once user submits a value word
    function createGameBoard(){
        // Store the value set to uppercase, spilt into arr in var
        inputWord = inputField.val();
        // Stores the return value for validate func
        let valiadation = validate(inputWord);
        if (valiadation) {
            input.hide();
            createLetterHolders(inputWord);
            createalphabet();
            alphabet.show();
            wordField.show();
        }
        else {
            inputField.val('');
        }
    }// end createGameBoard func

    // Check userGuess against inputWord arr
    function checkUserGuess(letterPicked, divClicked){
        if(inputWord.indexOf(letterPicked)!== -1){
            for(let i in inputWord){
                if(letterPicked === inputWord[i]) {
                    $('.letter').eq(i).show();
                    correctBank++;
            }}// end --> if sta, for loop
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
            hangman.html(gameImgs[7]);
        }// end else if sta
        alphabet.html('');
        $('button').eq(0).prop('id', 'startNewGame');
        initial.show();
    }//end checkEndGame func

    // Set up the game board
    setup();

    // Button onclick func
    $('button').click(function(){
        // If button clicked id is equal to start run this
        if($(this).attr('id') === 'start'){
            initial.hide();
            input.show();
            gameStarted = !gameStarted;
        }// end if sta
        // Else if button clicked id is equal to startNewGame run this
        else if ($(this).attr('id') === 'startNewGame'){
            setup();
            input.show();
        }// end else if sta
        else {
            createGameBoard();
        }// end else sta
    });// end -> func, onclick

    // Add onclick func to div that is dynamic created
    $(document).on('click', '#alphabet div', (function(){
        checkUserGuess($('p', this).text(), $(this));
        if ((guessBank === 0) || (correctBank === inputWord.length)){
            checkEndGame(guessBank);
        }//end if st
    }));// end --> func, func, onclick
});// end document.ready
