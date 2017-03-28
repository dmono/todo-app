var NavView = Backbone.View.extend({
  navCategories: function(completed) {
    var list = completed ? this.collection.getCompleted() : this.collection.toJSON();
    var groups = this.collection.findGroups(list);
    var categories = [];
    var self = this;

    groups.forEach(function(group) {
      categories.push({
        name: group,
        count: self.collection.filterTodos(list, group).length,
      });
    });

    return categories;
  },
  highlightNav: function() {
    var status = $("section").attr("data-status");
    var statusDiv = status ? "#completed_todos" : "#all_todos";
    var name = $("section").attr("data-name");

    $("nav dl").removeClass();

    $(statusDiv + " dl").filter(function() {
      return $(this).attr("data-name") === name;
    }).addClass("selected_list");
  },
  render: function() {
    var allTodos = this.navCategories();
    var completedTodos = this.navCategories(true);

    $('#all_todos').html(App.templates.nav_all({ items: allTodos, }));
    $('#completed_todos').html(App.templates.nav_complete({ items: completedTodos, }));

    $("#all_todos p").eq(0).text(this.collection.length);
    $("#completed_todos p").eq(0).text(this.collection.getCompleted().length);

    this.highlightNav();
  },
  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'list_updated', this.render);
  },
});