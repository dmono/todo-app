var App = {
  templates: JST,
  indexView: function() {
    this.index = new IndexView();
  },
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
  selectList: function(e) {
    e.preventDefault();
    var group = $(e.target).closest('dl').attr('data-name');
    $('section').attr('data-name', group).attr('data-status', status);

    if ($(e.target).closest("div").attr("id") === "completed_todos") {
      $("section").attr("data-status", "completed");
    }

    this.navView.render();
    this.renderList(group);
  },
  formatCompletedTodos: function(todos) {
    todos.forEach(function(item) {
      $("div.checkbox").closest("[data-id='" + item.id + "']").addClass("checked");
      $("a.item_link").closest("[data-id='" + item.id + "']").addClass("completed");
    });
  },
  renderList: function(group) { // refactor this?
    this.selectedGroup = group;
    var listCount = this.todos.length;
    var partialList;
    var completed = $('section').attr('data-status');

    if (group === 'All Todos') {
      new TodosView({ collection: this.todos });
    } else {
      if (group === 'Completed') {
        partialList = new Todos(this.todos.where({ completed: true }));
      } else {
        if (completed) {
          partialList = new Todos(this.todos.where({
          completed: true,
          group: group,
        }));
        } else {
          partialList = new Todos(this.todos.where({ group: group }));
        }
      }
      new TodosView({ collection: partialList });
      listCount = partialList.length;
    }

    $("section > h1").text(group);
    this.formatCompletedTodos(this.todos.getCompleted());
    $("section p.todo_count").text(listCount);
  },
  updateListView: function() {
    this.todos.updateStorage();
    this.todos.sort();
    this.renderList(this.selectedGroup);
  },
  newTodo: function() {
    this.modal = new ModalView();
    this.modal.renderAdd();
  },
  editTodo: function(id) {
    this.modal = new ModalView();
    this.modal.renderEdit(id);
  },
  editLink: function(e) {
    e.stopPropagation();
  },
  closeTodo: function(e) {
    if (this.modal) {
      this.modal.close(e);
    }
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    $('nav').on('click', 'dl', this.selectList.bind(this));
    // $("#modal form").on("click", "a.button", this.markComplete.bind(this));
    // $("section > ul").on("click", "a.item_link", this.editLink);
    $("section").on("click", "div.item", this.toggleDone.bind(this));
    $('main').on('click', 'div.modal_overlay', this.closeTodo.bind(this));
    $("section > ul").on("click", "div.delete", this.deleteTodo.bind(this));
    this.listenTo(this.todos, 'change', this.updateListView.bind(this));
    this.listenTo(this.todos, 'update', this.updateListView.bind(this));
  },
  init: function() {
    this.todos = new Todos(this.getTodos());
    this.renderList('All Todos');
    this.navView = new NavView({ collection: this.todos });
    this.bindEvents();
  }
}