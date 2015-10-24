Meteor.users.allow({
  insert: function(userId, user) {
    return userId;
  },
  update: function(userId, user, fields, modifier) {
    return userId;
  },
  remove: function(userId, user) {
    return userId;
  }
});
