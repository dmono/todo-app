var TodosView = Backbone.View.extend({
  tagName: 'li',
  el: $('main ul'),
  template: App.templates.list,
  render: function() {
    this.$el.html(this.template({ items: this.collection.toJSON(), }));
  },
  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'list_selected', this.render);
  }
});