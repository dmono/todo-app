var NavView = Backbone.View.extend({
  el: 'nav',
  events: {
    'click dl': 'selectList'
  },
  selectList: function(e) {
    var selectedGroup = $(e.currentTarget).attr('data-name');
    var status = $(e.currentTarget).attr('data-status'); 

    this.$el.find('dl').removeClass();
    $(e.currentTarget).addClass('selected_list');

    App.trigger('list_selected', selectedGroup, status);
  },
  navCategories: function(completed) {
    var groups = App.todos.findGroups(completed);
    var categories = [];
    var self = this;

    groups.forEach(function(group) {
      categories.push({
        name: group,
        count: App.todos.filterByGroup(group).length,
      });
    });

    return categories;
  },
  // highlightNav: function() {
  //   var status = $("section").attr("data-status");
  //   var statusDiv = status ? "#completed_todos" : "#all_todos";
  //   var name = $("section").attr("data-name");

  //   $("nav dl").removeClass();

  //   $(statusDiv + " dl").filter(function() {
  //     return $(this).attr("data-name") === name;
  //   }).addClass("selected_list");
  // },
  render: function() {
    var allTodos = this.navCategories();
    var completedTodos = this.navCategories(true);

    this.$el.find('#all_todos').html(App.templates.nav_all({ items: allTodos, }));
    this.$el.find('#completed_todos').html(App.templates.nav_complete({ items: completedTodos, }));

    $("#all_todos p").eq(0).text(this.collection.length);
    $("#completed_todos p").eq(0).text(this.collection.getCompleted().length);

    // this.highlightNav();
  },
  initialize: function() {
    this.render();
    // this.listenTo(this.collection, 'list_updated', this.render);
  },
});