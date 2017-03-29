var router = new (Backbone.Router.extend({
  routes: {
    'add': App.newTodo.bind(App),
    'edit/:id': 'edit',
  },
  edit: function(id) {
    App.editTodo.call(App, id);
  },
  index: function() {
    if (!App.modal.$el.is(':animated')) {
      App.modal.fadeOut();
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
  e.stopPropagation();
  router.navigate($(e.currentTarget).attr('href').replace(/^\//, ''), { trigger: true });
});