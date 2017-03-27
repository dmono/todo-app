var Todos = Backbone.Collection.extend({
  model: Todo,
  readStorage: function() {
    return JSON.parse(localStorage.getItem("todos"));
  }

});