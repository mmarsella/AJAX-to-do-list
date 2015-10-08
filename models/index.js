var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/todo_app");
mongoose.set('debug',true);
module.exports.Todo = require("./todo");