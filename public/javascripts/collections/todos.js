var Todos = Backbone.Collection.extend({
  model: Todo,
  comparator: 'completed',
  getCompleted: function() {
    // find better way to turn array of models into an array of objects
    var done = App.todos.where({ completed: true });
    done = _.map(done, function(m) {
      return m.toJSON();
    });

    return done;
  },
  filterTodos: function(list, group) {
    return _.where(list, { group: group });
  },
  readStorage: function() {
    return JSON.parse(localStorage.getItem("todos"));
  },
  updateStorage: function() {
    localStorage.setItem('todos', JSON.stringify(this.toJSON()));
  },
  findGroups: function(list) {
    var dateList = list.map(function(item) {
      return item.group;
    }).filter(function(date, index, dateArray) {
      return dateArray.indexOf(date) === index;
    });
  
    return this.sortGroupsByDate(dateList);
  },
  sortGroupsByDate: function(groups) {
    var idx;
    var sortedGroup = groups.sort(function(a, b) {
      var group1 = a.split('/');
      var group2 = b.split('/');

      group1 = group1[1] + group1[0];
      group2 = group2[1] + group2[0];

      return group1 - group2;
    });
    
    idx = sortedGroup.indexOf("No Due Date");

    if (idx !== -1) {
     sortedGroup.unshift(sortedGroup.splice(idx, 1)[0]); 
    }

    return sortedGroup;  
  },
});