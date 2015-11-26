'use strict'

Meteor.publish('chatters', function(options, searchString) {

  return Chatters.find({});
});
