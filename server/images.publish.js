'use strict'


Meteor.publish('images', function(options, searchString) {
  return Images.find({});
});
