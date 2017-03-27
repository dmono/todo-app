var express = require('express');
var router = express.Router();
var path = require('path');
var Todos = require(path.resolve(path.dirname(__dirname), 'modules/todos.js'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{
    todos: Todos.get(),
  });
});

module.exports = router;
