var Todo = Backbone.Model.extend({
  setGroup: function() {
    var month = this.get('month');
    var year = this.get('year');

    if (!month || !year) {
      return 'No Due Date';
    } else {
      return month + '/' + year.slice(2);
    }
  },
});