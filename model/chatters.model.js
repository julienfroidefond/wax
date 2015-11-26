Chatters = new Mongo.Collection('chatters');

Chatters.allow({
  insert: function(userId, chatter) {
    return userId;
  },
  update: function(userId, chatter, fields, modifier) {
    return userId;
  },
  remove: function(userId, chatter) {
    return userId;
  }
});
