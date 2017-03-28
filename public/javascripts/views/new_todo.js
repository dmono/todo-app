var $overlay = $('.modal_overlay');

var addTodoView = Backbone.View.extend({
  attributes: {
    id: 'modal_form',
  },
  template: App.templates.modal_form,
  duration: 300,
  events: {
    'submit form': 'create',
  },
  open: function() {
    this.$el.add($overlay).fadeIn(this.duration);
  },
  close: function(e) {
    e.preventDefault();
    this.fadeOut();
    history.back();
  },
  fadeOut: function() {
    $overlay.fadeOut(this.duration);
    this.$el.fadeOut(this.duration, function() {
      this.remove();
    }.bind(this));
  },
  create: function(e) {
    e.preventDefault();
    this.close(e);
  },
  render: function() {
    this.$el.html(this.template);
    this.open();
  },
  initialize: function() {
    this.$el.appendTo(document.body);
    this.render();
  },
});
