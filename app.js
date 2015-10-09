var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require("./models");
var methodOverride = require("method-override");
var morgan = require("morgan");

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
//server-side logger.  Logs requests to the terminal
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));



  
//ROOT
app.get("/", function (req,res){
  db.Todo.find({}, function (err, todos){
    res.format({
       'text/html': function(){
          res.render("index",{todos:todos});
        },
        'default': function() {
          // log the request and respond with 406
          res.status(406).send('Not Acceptable');
        }
    });
  });
});


//EDIT
app.get("/users/:id/edit", function (req,res){
});

//CREATE
app.post("/todos", function (req,res){
  console.log("THE INPUT:",req.body);
  var date = new Date();
  db.Todo.create({
  date:date,
  task:req.body.input   //grab the form data from the BODY!
  });

/*
1) Sending form info to the server
2) preventing default of the form - to prevent page refresh
3) sending back all of the db docs to the DOM
*/
db.Todo.find({}, function (err,todos){ 
  res.format({
        'application/json': function(){
          res.send({todos:todos});  //sending back 11am forecast
        },
        'default': function() {
          // log the request and respond with 406
          res.status(406).send('Not Acceptable');
        }
    });
  });
}); 

//DESTROY
app.delete("/todos/:id", function (req,res){
    console.log("THE DELETE INPUT:",req.body);
      db.Todo.findByIdAndRemove(req.params.id, function (err){
        if(err){
          console.log(err);
        }else{  
        res.format({
          'application/json': function(){
            res.send("DELETED");  //sending back 11am forecast
          },
          'default': function() {
            // log the request and respond with 406
            res.status(406).send('Not Acceptable');
            }
          });
        }
    });
});

//DESTROY ALL
app.delete("/clear", function (req,res){
  console.log("INSIDE THE DESTROY ALL!");
  db.Todo.remove({}, function (err){
    if(err){
      console.log(err);
    }
  });

});





app.get('*', function(req,res){
  res.render('404');
});

// start the server
app.listen(3000, function () {
  console.log("Starting a server on localhost:3000");
  });