// Shorthand for $( document ).ready()
$(function(){

    let userWord;

    // Onclick set userWord to input value, then clear field
    $('button').click(function(){
        userWord = $('input[name=word]').val();
        // Clear input field after click
        $('input[name=word]').val("");
        console.log(userWord);
    });
    // Splice the word to single letters and store into an array
    
    // Create "empty" divs for the length of array

    // Add array item to the div text field

    // Append every div to the wordField div

    //

});
