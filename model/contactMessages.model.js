ContactMessages = new Mongo.Collection('contactMessages');

ContactMessages.allow({
  insert: function(userId, contactMessage) {
    contactMessage.createdAt = new Date();
    return true;
  },
  update: function(userId, contactMessage, fields, modifier) {
    contactMessage.createdAt = new Date();
    return true;
  },
  remove: function(userId, chat) {
    return false;
  }
});
