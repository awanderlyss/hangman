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
    let guessCount = 0;

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
        userInputDiv.html("");
        for(let i in alphabet) {
            let span = $('<span></span>');
            span.text(alphabet[i].toUpperCase());
            if(alphabet.indexOf(alphabet[i]) === 13) {
                userInputDiv.append('<br>');
            }
            userInputDiv.append(span);
        }
    }

    // Onclick set userWord to input value, then clear field
    button.click(function(){
        // Only runs code once to initiate the game
        if (!gameStarted){
            gameStarted = !gameStarted;
            userWord = $('input[name=word]').val().toUpperCase();

            createLetterHolders(userWord);
            createAlphabetBoard();
        }
    });
    // Add an onclick function to the span that is dynamically created
    $(document).on('click', 'span', (function(){
        // userGuess is equal to the span.text that is clicked on

        let userGuess = $(this).text();
        for(let i = 0; i < letterArr.length; i++) {
            if(userGuess === letterArr[i]) {
                let selected = $(`.letter`).eq(i);
                selected.css("color", "black");
            }

        }
        $(this).css("background-color", "white");
        console.log(guessCount);
    }));
});
