'use strict'

Meteor.publish('chats', function(options, searchString) {

  return Chats.find({});
});
