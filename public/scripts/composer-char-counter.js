
// Counts the number of characters in a tweet being composed and counts down/up from the 140 allotted charactes
$(document).ready(function() {
  
  
  $('textarea').keyup(function() {
    let textLength = $(this).val().length;
    
    $('.counter').val(140 - textLength);
    
    $('.counter').val() < 0 ? $('.counter').css('color', 'red') :  $('.counter').css('color', '#545149')
  })

});

  