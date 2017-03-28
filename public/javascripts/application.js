var App = {
  templates: JST,
  getTodos: function() {
    return JSON.parse(localStorage.getItem("todos"));
  },
  updateTodos: function() {
    this.todos.reset(this.getTodos());
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
      console.log(item.id);
      $("div.checkbox").closest("[data-id='" + item.id + "']").addClass("checked");
      $("a.item_link").closest("[data-id='" + item.id + "']").addClass("completed");
    });
  },
  renderList: function(group) { // refactor this?
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
  bindEvents: function() {
    $('nav').on('click', 'dl', this.selectList.bind(this));
  },
  init: function() {
    this.todos = new Todos(this.getTodos());
    this.renderList('All Todos');
    this.navView = new NavView({ collection: this.todos });
    this.bindEvents();
  }
}