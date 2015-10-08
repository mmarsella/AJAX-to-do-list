$(document).ready(function(){


/**********CREATE**************/
/******************************/

/***** FORM SUBMIT AJAX CALL ******/
  $('form').on('submit', function(e){
    e.preventDefault();
     var input = $('input').val();
  if(input.length > 0)
  {
     $.ajax({
        url:"/todos",
        dataType: "json",
        method: "POST",
        data:{
          input:input
        }
      }).done(function(serverResponse){
        var array = serverResponse.todos;
        $('input').val(""); // clears the input bar
        $('ul').empty(); // clears the ul before appending ALL of the to_dos from the db
       
        array.forEach(function(el){
        $("ul").append("<li>"+el.task+"</li>");
        });
      });
  }
  else{
    console.log("NO INPUT!!!");
  }
  });






});  // End of onload