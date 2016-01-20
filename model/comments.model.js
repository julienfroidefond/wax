Comments = new Mongo.Collection('Comments');

Comments.allow({
  insert: function(userId, comment) {
    comment.createdAt = new Date();
    return true;
  },
  update: function(userId, comment, fields, modifier) {
    comment.createdAt = new Date();
    return true;
  },
  remove: function(userId, comment) {
    return true;
  }
});
