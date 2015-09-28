$(document).ready(function(){
  // alert('hi');
  $('form').submit(function(e){
    e.preventDefault();
    var message_body = $('#message').val();
    console.log(message_body);
    $('#message').val('');
    $('#message').focus();
    // console.log('hi');
    $.ajax({
      url:    '/messages',
      method: 'post',
      data:   {message: message_body}


    });

  });
});