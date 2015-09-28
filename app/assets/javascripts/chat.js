$(document).ready(function(){


  // load all the messages:
  function loadAllMessages(){
     $.ajax({
        url:         '/messages',
        method:      'get',
        success:     function(data){
        console.log(data);

        $('#all_messages').html("");
        for (var i=0;i<data.length;i++){
          $('#all_messages').append("<li>"+"<strong>"+data[i].body+"</strong>"+"-"+data[i].created_at+"<i>x</i>" + "</li>");
        }


        },
        error:       function(data){
        console.log(data.statusText, data.status);
        }
      });
  }
 

  setInterval(loadAllMessages, 2000);


  // submit message form:
  $('form').submit(function(e){
    e.preventDefault();
    var message_body = $('#message').val();
    
    $('#message').val('');
    $('#message').focus();

    $.ajax({
      url:      '/messages',
      method:   'post',
      data:     {message: message_body},

      success: function(){
        loadAllMessages();
      },

  
      error: function(data){
        console.log(data);
          var response = jQuery.parseJSON(data.responseText);
          var error_message = response.errors.join("\n");
          alert(error_message);
      }

    }); //end of ajax function 

    // loadAllMessages();

  });   //end of $('form') submit function






});     //end of document.ready