var Todo = Backbone.Model.extend({
  update: function(data) {
    this.title = data[0].value;
    this.day = data[1].value !== 'Day' ? data[1].value : null;
    this.month = data[2].value !== 'Month' ? data[2].value : null;
    this.year = data[3].value !== 'Year' ? data[3].value : null;
    this.group = Todo.setGroup(this.day, this.month, this.year);
    this.description = data[4].value;
  },
  setGroup: function(day, month, year) {
    if (!month || !year) {
      return "No Due Date";
    } else {
      return month + '/' + year.slice(2);
    }
  },
  initialize: function() {
    this.set('group', this.setGroup(this.get('day'), this.get('month'), this.get('year')));
  },
});