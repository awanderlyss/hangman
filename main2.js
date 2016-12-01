// Shorthand for $( document ).ready()
$(function(){
    // Declare variables
    let alphabetBoard = $('#alphabetBoard');
    let guessBoard = $('#guessBoard');
    let initialStart = $('#initialStart');
    let input = $('#input');

    // Hide elements until needed
    alphabetBoard.hide();
    guessBoard.hide();
    input.hide();

    $('button').click(function(){
        if($(this).attr('id') === 'start'){
            initialStart.hide();
            input.show();
        }
    });// end -> function, button click

});// end document.ready
