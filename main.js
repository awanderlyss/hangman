// Shorthand for $( document ).ready()
$(function(){
    // Declare variables
    let inputWord;
    let player1 = 0;
    let player2 = 0;
    let gameCount = 0;
    let alphabet = $('#alphabet');
    let scoreboard = $('#scoreboard');
    let initial = $('#initial');
    let input = $('#input');
    let hangman = $('#hangman');
    let inputField = $('input[name=word]');
    let wordField = $('#wordField');
    let gameStarted = false;
    let player1Turn = false;
    let gameImgs = ['img/player-one-win.png',
        'img/img5.png',
        'img/img4.png',
        'img/img3.png',
        'img/img2.png',
        'img/img1.png',
        'img/start.png',
        'img/player-two-win.png'];

    function setup(){
        if(gameStarted){
            //Clear dynamically created els from html
            $('.instructions').eq(0).text('');
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
        hangman.css('background-image', `url(${gameImgs[6]})`);
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
            inputWord = inputWord.toUpperCase().split('');
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

    //Create "updating" scoreboard
    function createScoreBoard(gameCount, player1, player2, guessBank){
      scoreboard.find('p').remove();
      scoreboard.append(`<p>Games Played: ${gameCount}</p>`);
      scoreboard.append(`<p>Player 1 Score: ${player1}</p>`);
      scoreboard.append(`<p>Player 2 Score: ${player2}</p>`);
      scoreboard.append(`<p>Guess Left: ${guessBank}</p>`);
      if (gameCount % 2){
        scoreboard.find('p').eq(1).addClass('player2');
        scoreboard.find('p').eq(2).addClass('player1');
      }
      else {
        scoreboard.find('p').eq(1).addClass('player1');
        scoreboard.find('p').eq(2).addClass('player2');
      }
    }

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
            hangman.css('background-image', 'none');
            hangman.css('background-image', `url(${gameImgs[guessBank]})`);
        }//end else sta
    }// end checkUserGuess func

    // Changes the play score based on the number of games played
    function reverseScore(player1Turn){
        if (player1Turn){
          player1 += 100;
        }
        else {
          player2 +=100;
        }
    }
    //Check to see if the game is over, declare a winner
    function checkEndGame(guessBank) {
        if (guessBank === 0){
            $('.instructions').eq(0).text('Player 1 has defeated Player 2! Switch roles, and play again?');
            $('.letter').show();
            reverseScore(!player1Turn);
        }// end if sta
        else {
            $('.instructions').eq(0).text('Player 2 has defeated Player 1! Switch roles, and play again?');
            hangman.css('background-image', `url(${gameImgs[7]})`);
            reverseScore(player1Turn);
        }// end else if sta
        alphabet.html('');
        $('button').eq(0).prop('id', 'startNewGame');
        $('.instructions').eq(1).text('');
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
            gameCount++;
            player1Turn = !player1Turn;
        }// end else if sta
        else {
            createGameBoard();
        }// end else sta
        createScoreBoard(gameCount, player1, player2, guessBank);
    });// end -> func, onclick

    // Add onclick func to div that is dynamic created
    $(document).on('click', '.alphabet', (function(){
        checkUserGuess($('p', this).text(), $(this));
        $(this).removeClass('alphabet');
        $(this).addClass('clicked');
        createScoreBoard(gameCount, player1, player2, guessBank);
        if ((guessBank === 0) || (correctBank === inputWord.length)){
            checkEndGame(guessBank);
        }//end if st
    }));// end --> func, func, onclick
});// end document.ready
