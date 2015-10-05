$(document).ready(function(){
  $('#message').html("");


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
          $('#all_messages').prepend("<li data-message_id="+
                                      data[i].id+"><i>x </i><strong>"+
                                      data[i].user_name+": </strong>"+
                                      data[i].body+"<span id=\"created_at\">"+
                                      data[i].created_at+" ago</span></li>");
        }


        },
        error:       function(data){
          console.log(data.statusText, data.status);
        }
      });
  }


  // calling above function
  loadAllMessages();




  // helper function for appending user names to list of online users
  function appendIfDosntExist(user){
    if ( $('#online_users').text().indexOf(user) === -1 )
    {
        $('#online_users').append("<li><span class='label label-success'>"+user+"</span></li>");
    }
  }


  // helper function for User is typing display
  // function userIsTyping(user){
    
     // if ($('#message').val() === "")
      // {
        // $('#users_typing_messages').html("");
      // }
      // else
      // {
  //       $("#message").keypress(function(){
          // if ( $('#'+user+'_typing').length === 0)
          // {
            // $('#users_typing_messages').append("<li id="+user+"_typing>"+user+" is typing..."+"</li>");
          // }

  //       });
      // }
 
  // }
 



  // submit new message form:
  $('#submit_message_form').submit(function(e){
    e.preventDefault();
    var message_body = $('#message').val();
    var posted_by    = $('#message').data("username");
    var posted_by_id = $('#message').data("userid");
    

    $('#message').val('');
    $('#message').focus();


    $.ajax({
      url:      'users/'+posted_by_id+'/messages',
      method:   'post',
      data:     { message: message_body, user_id: posted_by_id},

      success: function(data){
        console.log(data);
        loadAllMessages();
      },
      
      error: function(data){
         var response = jQuery.parseJSON(data.responseText);
         var error_message = response.errors.join(",");
         alert(error_message);
      }

    }); //end of ajax function 

  });   //end of submit form function




  // call loadallmessages every 2 seconds(polling)
  setInterval(loadAllMessages,2000);





   // event delegation (when x icon is clicked - delete message)
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
   });







   // online users 

   function seeWhosOnline(){
      $.ajax({
        url:      "/users",
        method:   "get",
        dataType: "json",
        success: function(data){
          // data retuns online users
          console.log(data);
          console.log(data.length);
          // if users online(online user count is not 0)
          if (data.length !== 0){
            $('#online_users').html("Online users:");
            for (var i=0;i<data.length;i++){
              appendIfDosntExist(data[i].user_name);
              // userIsTyping(data[i].user_name);
            }
          }
          else{
            // if no users online
            $('#online_users').html("No users currently online");
          }
          
        
        },
        error: function(data){
          console.log(data);
        }
      });
      
   }

  seeWhosOnline();

  setInterval(seeWhosOnline, 2000);
   





});     //end of document.ready