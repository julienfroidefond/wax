'use strict'

Meteor.publish('comments', function(options, searchString) {

  return Comments.find({});
});
