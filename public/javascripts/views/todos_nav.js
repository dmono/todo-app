var NavView = Backbone.View.extend({
  el: 'nav',
  events: {
    'click dl': 'selectList'
  },
  selectList: function(e) {
    App.selectedGroup = $(e.currentTarget).attr('data-name');
    App.selectedStatus = $(e.currentTarget).attr('data-status'); 
    App.updateViews();
  },
  navCategories: function(completed) {
    var groups = App.todos.findGroups(completed);
    var categories = [];

    groups.forEach(function(group) {
      categories.push({
        name: group,
        count: App.todos.filterByGroupStatus(group, completed).length,
      });
    });

    return categories;
  },
  highlightNav: function() {
    var statusDiv = App.selectedStatus ? "#completed_todos" : "#all_todos";

    this.$('dl').removeClass();

    $(statusDiv + " dl").filter(function() {
      return $(this).attr("data-name") === App.selectedGroup;
    }).addClass("selected_list");
  },
  render: function() {
    var allTodos = this.navCategories();
    var completedTodos = this.navCategories(true);

    this.$('#all_todos').html(App.templates.nav_all({ items: allTodos, }));
    this.$('#completed_todos').html(App.templates.nav_complete({ items: completedTodos, }));

    $("#all_todos p").eq(0).text(this.collection.length);
    $("#completed_todos p").eq(0).text(this.collection.getCompleted().length);

    this.highlightNav();
  },
  initialize: function() {
    this.render();
  },
});