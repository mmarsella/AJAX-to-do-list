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
        $("ul").append("<li>"+el.task+"<button class='del' id=" + el._id + " type='button'>X</button>" + "</li>");
            /****** DELETE BUTTON ***********/

        });
        //will only work inside of .done b/c the dom (when first loaded) doesn't know about all of the new li's.
            $(".del").on("click", function (e){

              var delButton = this.id;
              $.ajax({
                url:"/todos",
                dataType:"json",
                method:"DELETE",
                data:{
                  delButton:delButton
                }
              }).done(function(afterDelete){
                 var newArray = afterDelete.todos;
            $('ul').empty(); // clears the ul before appending ALL of the to_dos from the db
       
              newArray.forEach(function(el){
              $("ul").append("<li>"+el.task+"<button class='del' id=" + el._id + " type='button'>X</button>" + "</li>");
            /****** DELETE BUTTON ***********/

        });

              });

              // console.log(this.id);
            });  //end delete click
      });
  }
  else{
    console.log("NO INPUT!!!");
  }
  });

/**** CLEAR BUTTON ***************/
$("#clear").on("click", function(e){
  e.preventDefault();
    $('ul').empty();  //clear out all the todos.

  $.ajax({
    url:"/clear",
    dataType:"json",
    method: "DELETE",  //can we use put and delete??
  }).done(function(serverResponse){
  });

});

/***** DELETE BUTTON *******/















});  // End of onload