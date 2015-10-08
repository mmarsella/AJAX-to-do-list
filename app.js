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
  res.render("index");
});

//EDIT
app.get("/users/:id/edit", function (req,res){
});

//CREATE
app.post("/users", function (req,res){
});

//UPDATE
app.put("/users/:id", function (req,res){
});

//DESTROY
app.delete("/users/:id", function (req,res){
});



app.get('*', function(req,res){
  res.render('404');
});

// start the server
app.listen(3000, function () {
  console.log("Starting a server on localhost:3000");
  });