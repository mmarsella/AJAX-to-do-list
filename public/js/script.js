$(document).ready(function(){



  $('form').on('submit', function(e){
     var input = $('input').val();
   $.ajax({
      url:"/todos",
      dataType: "json",
      method: "POST",
      data:{
        input:input
      }
    }).done(function(serverResponse){
      console.log("DONE for now...");
    });
  });


});  // End of onload