var Todos = Backbone.Collection.extend({
  model: Todo,
  comparator: 'completed',
  getCompleted: function() {
    return new Todos(this.where({ completed: true, }));
  },
  filterByGroup: function(group) {
    return new Todos(this.where({ group: group }));
  },
  filterByGroupStatus: function(group, status) {
    if (!status) {
      return this.filterByGroup(group);
    } else {
      return new Todos(this.where({
        group: group,
        completed: true,
      }));
    }
  },
  updateStorage: function() {
    localStorage.setItem('todos', JSON.stringify(App.todos.toJSON()));
    localStorage.setItem('lastId', this.lastId);
  },
  nextId: function() {
    return ++this.lastId;
  },
  findGroups: function(completed) {
    var groups;

    if (completed) {
      groups = _.uniq(this.getCompleted().pluck('group'));
    } else {
      groups = _.uniq(this.pluck('group'));
    }

    return this.sortGroupsByDate(groups);
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
  initialize: function() {
    if (!localStorage.getItem('todos')) {
      this.lastId = 0;
      localStorage.setItem('todos', '[]');
      localStorage.setItem('lastId', 0);
    } else {
      this.lastId = +localStorage.getItem('lastId');
    }
  },
});