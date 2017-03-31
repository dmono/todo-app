var TodoView = Backbone.View.extend({
  template: App.templates.todo,
  tagName: 'li',
  events: {
    'click div.item': 'toggleDone',
    'click div.delete': 'deleteTodo',
    'click a.item_link': 'editTodo',
  },
  toggleDone: function() {

  },
  deleteTodo: function() {

  },
  editTodo: function() {

  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));

    if (this.model.get('completed')) {
      this.$el.find('.checkout').addClass('checked');
      this.$el.find('a').addClass('completed');
    }

    this.$el.appendTo(App.$el);
  },
  initialize: function() {
    this.render();
    this.listenTo(this.model, 'change', this.render);
    // need to render list again as well
  },

});