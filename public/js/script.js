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
        $("ul").append("<li>"+el.task+"<button class='del' data-id=" + el._id + " type='button'>X</button>" + "</li>");
        });
         delItemAndRefresh(); //will only work inside of .done b/c the dom (when first loaded) doesn't know about all of the new li's.
         addCrossout();
        });  //END OF SUBMIT .done
    }else{
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
/***************************/
 
//after delete, add all of the li's w/ a on click/del event listener

  $("body").on("click", ".del" ,function (e){
    //remove element w/jquery
    $(this).parent().remove();
    var delButton = $(this).data("id");  // this refers to the delegate..... .del
    $.ajax({
      url:"/todos/"+$(this).data("id"),
      dataType:"json",
      method:"DELETE",
    }).done(function(){
   
      });
    });
    //end delete click



/******** CROSSOUT *********/

function addCrossout(){
  $("li").on("click",function (){
    $(this).toggleClass("completed");
  });  
}















});  // End of onload