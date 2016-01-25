Comments = new Mongo.Collection('Comments');

Comments.allow({
  insert: function(userId, comment) {
    comment.createdAt = new Date();
    return userId;
  },
  update: function(userId, comment, fields, modifier) {
    comment.createdAt = new Date();
    return userId;
  },
  remove: function(userId, comment) {
    return userId && comment.userId === userId;
  }
});
