var TodoView = Backbone.View.extend({
  tagName: 'li',
  el: $('main ul'),
  template: App.templates.list,
  render: function() {
    this.$el.html(this.template({ items: App.todos.toJSON(), }));
  },
  initialize: function() {
    this.render();
  }
});