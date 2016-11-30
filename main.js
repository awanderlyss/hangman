// Shorthand for $( document ).ready()
$(function(){

    let userWord;
    let letterArr = [];
    let wordFieldDiv = $('#wordField');

    // Onclick set userWord to input value, then clear field
    $('button').click(function(){
        userWord = $('input[name=word]').val().toUpperCase();
        // Clear the current elements that have values
        $('input[name=word]').val("");
        wordFieldDiv.text(" ");
        letterArr = [];

        createLetterHolders(userWord);
    });

    // Create letterholder based on length of word
    function createLetterHolders(userWord) {
        for(let i = 0; i < userWord.length; i++) {
            // Store each letter in letterArr
            letterArr[i] = userWord[i];
            // Create a div el w/ 2 els p & span
            let letterHolderDiv = $(`<div class="letterHolder">
                <p class="letter">${userWord[i]}</p><div class="dash"></div>
                </div>`);
            // Append letterHolderDiv to the wordFieldDiv
            wordFieldDiv.append(letterHolderDiv);
        }
    }
    // Add array item to the div text field

    // Append every div to the wordField div

    //

});
