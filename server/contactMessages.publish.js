'use strict'

Meteor.publish('contactMessages', function(options, searchString) {

  return ContactMessages.find({}, {sort:{createdAt : -1}});
});
