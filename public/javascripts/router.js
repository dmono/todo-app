var router = new (Backbone.Router.extend({
  routes: {
    'add': App.newTodo.bind(App),
    'edit/:id': App.editTodo.bind(App),
  },
  index: function() {
    if (!App.addModal.$el.is(':animated')) {
      App.addModal.fadeOut();
    }

    if (!App.editModal.$el.is(':animated')) {
      App.editModal.fadeOut();
    }
  },
  initialize: function() {
    this.route(/^\/?$/, 'index', this.index);
  },
}))();

Backbone.history.start({
  pushState: true,
  silent: true,
});

$(document).on('click', "a[href^='/']", function(e) {
  e.preventDefault();
  router.navigate($(e.currentTarget).attr('href').replace(/^\//, ''), { trigger: true });
});