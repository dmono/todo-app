var path = require('path');
var fs = require('fs');
var file_path = path.resolve(path.dirname(__dirname), 'data/todos.json');

var todos = {};

todos.get = function() {
  return JSON.parse(fs.readFileSync(file_path, 'utf8'));
};

todos.updateStorage = function(list, date) {
  localStorage.setItem('todos', JSON.stringify(list));
};

module.exports = todos;