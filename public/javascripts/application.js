var App = {
  templates: JST,
  $el: $('main ul'),
  getTodos: function() {
    return JSON.parse(localStorage.getItem("todos"));
  },
  updateTodos: function() {
    this.todos.reset(this.getTodos());
  },
  toggleDone: function(e) {
    var id = +$(e.target).attr('data-id');
    var status = this.todos.get(id).get('completed');
    this.todos.get(id).set('completed', !status);
  },
  deleteTodo: function(e) {
    e.preventDefault();
    var id = +$(e.target).closest('div').attr('data-id');

    if (confirm("Are you sure you want to delete this todo?")) {
      this.todos.remove(this.todos.findWhere({ id: id }));
    }
  },
  renderTodos: function(group, status) {
    this.selectedGroup = group;
    var collection;
  
    this.$el.html('');

    if (group === 'All Todos') {
      collection = this.todos;
    } else if (group === 'Completed') {
      collection = this.todos.getCompleted();
    } else {
      collection = this.todos.filterByGroupStatus(group, status);
    }

    collection.each(this.renderTodoView);

    $("section > h1").text(group);
    $("section p.todo_count").text(collection.length);
  },
  renderTodoView: function(todo) {
    new TodoView({
      model: todo,
    });
  }, 
  updateListView: function() {
    console.log('deleted!');
    this.todos.updateStorage();
    this.todos.sort();
    // this.renderList(this.selectedGroup);
  },
  newTodo: function(e) {
    e.preventDefault();
    this.modal = new ModalView();
    this.modal.renderAdd();
  },
  editTodo: function(e) {
    e.preventDefault();
    e.stopPropagation();
    var id = $(e.target).closest('a').attr('data-id');

    this.modal = new ModalView();
    this.modal.renderEdit(id);
  },
  closeModal: function(e) {
    if (this.modal) {
      this.modal.close(e);
    }
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    // $('nav').on('click', 'dl', this.selectList.bind(this));
    $("section > a").on("click", this.newTodo.bind(this));
    $("section > ul").on("click", "a.item_link", this.editTodo.bind(this));
    $("section").on("click", "div.item", this.toggleDone.bind(this));
    $('main').on('click', 'div.modal_overlay', this.closeModal.bind(this));
    $("section > ul").on("click", "div.delete", this.deleteTodo.bind(this));

    this.on('list_selected', this.renderTodos.bind(this));
  },
  init: function() {
    this.todos = new Todos(this.getTodos());
    this.bindEvents();
    this.renderTodos('All Todos');

    this.navView = new NavView({ collection: this.todos });
    
  }
};