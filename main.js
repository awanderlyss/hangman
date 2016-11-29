// Shorthand for $( document ).ready()
$(function(){

    let userWord;
    let letterArr = [];
    // Onclick set userWord to input value, then clear field
    $('button').click(function(){
        userWord = $('input[name=word]').val();
        // Clear input field after click
        $('input[name=word]').val("");
        createLetterHolders(userWord);
    });

    // Create letterholder based on length of word
    function createLetterHolders(userWord) {
        for(let i = 0; i < userWord.length; i++) {
            // Store each letter in an array
            letterArr[i] = userWord[i];
        }
        console.log(letterArr);
    }
    // Add array item to the div text field

    // Append every div to the wordField div

    //

});
