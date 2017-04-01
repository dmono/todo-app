var TodoView = Backbone.View.extend({
  template: App.templates.todo,
  tagName: 'li',
  events: {
    'click div.item': 'toggleDone',
    'click div.delete': 'deleteTodo',
    'click a.item_link': 'editTodo',
  },
  toggleDone: function(e) {
    e.preventDefault();
    this.model.set('completed', !this.model.get('completed'));
    App.trigger('todo_updated');
  },
  deleteTodo: function(e) {
    e.preventDefault();

    if (confirm("Are you sure you want to delete this todo?")) {
      App.todos.remove(this.model);
    }
  },
  editTodo: function(e) {
    e.preventDefault();
    e.stopPropagation();

    App.modal = new ModalView();
    App.modal.render(this.model);
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));

    if (this.model.get('completed')) {
      this.$el.find('.checkbox').addClass('checked');
      this.$el.find('a').addClass('completed');
    }

    this.$el.appendTo(App.$el);
  },
  initialize: function() {
    this.render();
  },

});