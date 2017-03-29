var $overlay = $('.modal_overlay');

var addTodoView = Backbone.View.extend({
  attributes: {
    id: 'modal_form',
  },
  template: App.templates.modal_form,
  duration: 300,
  events: {
    'submit form': 'create',
  },
  open: function() {
    this.$el.add($overlay).fadeIn(this.duration);
  },
  close: function(e) {
    e.preventDefault();
    this.fadeOut();
    history.back();
  },
  fadeOut: function() {
    $overlay.fadeOut(this.duration);
    this.$el.fadeOut(this.duration, function() {
      this.remove();
    }.bind(this));
  },
  cleanEmptyDates: function(data) {
    if (data.day === 'Day') { data.day = null }
    if (data.month === 'Month') { data.month = null }
    if (data.year === 'Year') { data.year = null }
  },
  create: function(e) {
    e.preventDefault();
    var $form = this.$('form');
    var data = {};
    var newTodo;

    $form.serializeArray().forEach(function(field) {
      data[field.name] = field.value;
    });
    console.log($form.serializeArray());

    newTodo = new Todo(this.cleanEmptyDates(data));
    newTodo.set('completed', false).set('id', App.todos.nextId());
    App.todos.add(newTodo);

    App.todos.updateStorage();
    App.updateListView();

    this.close(e);
  },
  render: function() {
    this.$el.html(this.template);
    this.open();
  },
  initialize: function() {
    this.$el.appendTo(document.body);
    this.render();
  },
});
