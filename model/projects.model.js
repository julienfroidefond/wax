Projects = new Mongo.Collection('projects');

Projects.allow({
  insert: function(userId, project) {
    project.createdAt = new Date();
    project.name_sort = project.name.toLowerCase();
    return userId;
  },
  update: function(userId, project, fields, modifier) {
    project.createdAt = new Date();
    project.name_sort = project.name.toLowerCase();
    return userId;
  },
  remove: function(userId, project) {
    return userId && project.owner === userId;
  }
});
