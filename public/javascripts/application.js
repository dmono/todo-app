var App = {
  templates: JST,
  $el: $('main ul'),
  readStorage: function() {
    return JSON.parse(localStorage.getItem('todos')) || [];
  },
  updateStorage: function() {
    localStorage.setItem('todos', JSON.stringify(this.todos.toJSON()));
    localStorage.setItem('lastId', this.lastId);
  },
  renderTodos: function() {
    var collection;
  
    this.$el.html('');

    if (this.selectedGroup === 'All Todos') {
      collection = this.todos;
    } else if (this.selectedGroup === 'Completed') {
      collection = this.todos.getCompleted();
    } else {
      collection = this.todos.filterByGroupStatus(this.selectedGroup, this.selectedStatus);
    }

    collection.sort();
    collection.each(this.renderTodoView);

    $('section > h1').text(this.selectedGroup);
    $('section p.todo_count').text(collection.length);
  },
  renderTodoView: function(todo) {
    new TodoView({
      model: todo,
    });
  },
  updateViews: function() {
    this.renderTodos();
    this.navView.render();
  },
  newTodo: function(e) {
    e.preventDefault();
    this.modal = new ModalView();
    this.modal.render();
  },
  closeModal: function() {
    if (this.modal) {
      this.modal.close();
    }
  },
  toggleNav: function(e) {
    e.preventDefault();

    $('#nav_toggle').toggleClass('open_nav');
    $('nav').toggleClass('show');
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    $('section > a').on('click', this.newTodo.bind(this));
    $('main').on('click', 'div.modal_overlay', this.closeModal.bind(this));
    $('#nav_toggle').on('click', this.toggleNav);
    this.listenTo(this.todos, 'update', this.updateViews.bind(this));
    this.on('todo_updated', this.updateViews.bind(this));
    $(window).on('unload', this.updateStorage.bind(this));
  },
  init: function() {
    this.lastId = localStorage.getItem('lastId') || 0;
    this.todos = new Todos(this.readStorage());
    this.bindEvents();
    this.selectedGroup = 'All Todos';
    this.renderTodos(this.selectedGroup);
    this.navView = new NavView({ collection: this.todos });
  }
};