$(document).ready(function(){


  // load all the messages:
  function loadAllMessages(){
     $.ajax({
        url:         '/messages',
        method:      'get',
        success:     function(data){
        console.log(data);

        // var username;
        $('#all_messages').html("");

        for (var i=0;i<data.length;i++){
          $('#all_messages').prepend("<li data-message_id="+data[i].id+"><i>x</i><strong>"+data[i].user+": </strong>"+data[i].body+"<span id=\"created_at\">"+data[i].created_at+" ago</span></li>");
        }


        },
        error:       function(data){
          console.log(data.statusText, data.status);
        }
      });
  }
 

  // var message_interval = setInterval(loadAllMessages, 2000);


  // submit message form:
  $('#submit_message_form').submit(function(e){
    e.preventDefault();
    var message_body = $('#message').val();
    var posted_by = $('#message').data("username");
    
    $('#message').val('');
    $('#message').focus();

    $.ajax({
      url:      '/messages',
      method:   'post',
      data:     { message: message_body, user_name: posted_by },

      success: function(data){
        // console.log(data);
        loadAllMessages();
      },
      
      error: function(data){
         // var response = jQuery.parseJSON(data.responseText);
         // var error_message = response.errors.join(",");
         // alert(error_message);
         alert("Cant create Message");
      }

    }); //end of ajax function 

     // loadAllMessages();

  });   //end of $('form') submit function


  loadAllMessages();
   // setInterval(loadAllMessages,2000);


   // event delegation 
   $('#all_messages').on("click", "i", function(){
    var node_to_delete = $(this).parent("li").data("message_id");
    console.log(node_to_delete);
    $.ajax({
      url:    "/messages/"+node_to_delete,
      method: "delete",
      success: function(data){
        console.log(data);
      },
      error: function(data)
      {
        console.log(data);
      }

    });


    $(this).parent("li").slideUp();
    // alert('clicked');
   });






});     //end of document.ready