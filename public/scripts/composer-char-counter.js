

$(document).ready(function() {
  console.log("THESE ARE CATS")
  
  $('textarea').keyup(function() {
    let textLength = $(this).val().length;
    
    $('.counter').val(140 - textLength);
    
    $('.counter').val() < 0 ? $('.counter').css('color', 'red') :  $('.counter').css('color', '#545149')
  })

});

  