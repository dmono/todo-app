var IndexView = Backbone.View.extend({
  attributes: {
    id: 'index',
  },
  events: {
    'click a.add_new': 'addTodo',
  },
  addTodo: function(e) {
    e.preventDefault();
    this.trigger('add_todo');
  },
  render: function() {
    
  },
  initialize: function() {
    this.render();
  },
});