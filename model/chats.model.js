Chats = new Mongo.Collection('chats');

Chats.allow({
  insert: function(userId, chat) {
    chat.createdAt = new Date();
    return userId;
  },
  update: function(userId, chat, fields, modifier) {
    chat.createdAt = new Date();
    return userId;
  },
  remove: function(userId, chat) {
    return userId;
  }
});
