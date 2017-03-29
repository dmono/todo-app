var $overlay = $('.modal_overlay');

var ModalView = Backbone.View.extend({
  attributes: {
    id: 'modal_form',
  },
  template: App.templates.modal_form,
  duration: 300,
  events: {
    'submit form': 'submitData',
    'click .mark_complete': 'markComplete',
  },
  open: function() {
    this.$el.add($overlay).fadeIn(this.duration);
  },
  close: function() {
    this.fadeOut();
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

    return data;
  },
  submitData: function(e) {
    e.preventDefault();
    if (this.todoId) {
      this.edit();
    } else {
      this.create();
    }
  },
  create: function() {
    var $form = this.$('form');
    var data = {};
    var newTodo;

    $form.serializeArray().forEach(function(field) {
      data[field.name] = field.value;
    });

    newTodo = new Todo(this.cleanEmptyDates(data));
    newTodo.set('completed', false).set('id', App.todos.nextId()).set('group', newTodo.setGroup());

    App.todos.add(newTodo);

    App.todos.updateStorage();
    App.updateListView();

    this.close();
  },
  edit: function() {
    var $form = this.$('form');
    var todo = App.todos.findWhere({ id: this.todoId });
    var data = $form.serializeArray();

    $form.serializeArray().forEach(function(field) {
      data[field.name] = field.value;
    });

    todo.set(this.cleanEmptyDates(data)).set('group', todo.setGroup());
    App.todos.updateStorage();
    App.updateListView();

    this.close();
  },
  populateFields: function(id) {
    var item = App.todos.findWhere({ id: +id }).toJSON();
    var $fields = $("input[type='text'], select, textarea");
    this.todoId = +id;

    $($fields[0]).val(item.title);

    if (item.day) { $($fields[1]).val(item.day) };
    if (item.month) { $($fields[2]).val(item.month) };
    if (item.year) { $($fields[3]).val(item.year) };
    
    $($fields[4]).val(item.description);
  },
  markComplete: function(e) {
    e.preventDefault();
    var todo;

    if (!this.todoId) {
      alert("Cannot mark as complete as item has not been created yet!");
      return;
    }

    todo = App.todos.findWhere({ id: this.todoId });
    todo.set({ 'completed': true });

    App.todos.updateStorage();
    App.updateListView();

    this.close();
  },
  renderAdd: function() {
    this.$el.html(this.template);
    this.open();
  },
  renderEdit: function(id) {
    this.$el.html(this.template);
    this.populateFields(id);
    this.open();
  },
  initialize: function() {
    this.$el.appendTo(document.body);
  },
});
