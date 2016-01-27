'use strict'

Meteor.publish('projects', function(options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfProjects', Projects.find(where), {noReady: true});
  return Projects.find(where, options);
});
Meteor.publish('allProjects', function() {

  return Projects.find({});
});
