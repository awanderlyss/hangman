// Shorthand for $( document ).ready()
$(function(){

    let userWord;
    let letterArr = [];
    let wordFieldDiv = $('#wordField');
    let userInputDiv = $('#userInput');
    let gameStarted = false;
    let button = $('button');
    // Creates an array with the letters of the alphabet
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    // Onclick set userWord to input value, then clear field
    button.click(function(){
        // Only runs code once to initiate the game
        if (!gameStarted){
            gameStarted = !gameStarted;
            userWord = $('input[name=word]').val().toUpperCase();
            // Change the text value of the button
            button.text('Submit Letter');

            createLetterHolders(userWord);
            createAlphabetBoard();
        }

    });

    // Create letterholder based on length of word
    function createLetterHolders(userWord) {
        for(let i = 0; i < userWord.length; i++) {
            // Store each letter in letterArr
            letterArr.push(userWord[i]);
            // Create a div el w/ 2 els p & span
            let letterHolderDiv = $(`<div class="letterHolder">
                <p class="letter">${userWord[i]}</p><div class="dash"></div>
                </div>`);
            // Append letterHolderDiv to the wordFieldDiv
            wordFieldDiv.append(letterHolderDiv);
        }
    }

    // Create alphabet board for user letter guess
    function createAlphabetBoard(){
        userInputDiv.html("");
        for(let i in alphabet) {
            let span = $('<span></span>');
            span.text(alphabet[i].toUpperCase());
            userInputDiv.append(span);
        }
    }

});
