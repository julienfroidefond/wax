
Meteor.methods({
  setParticipeTo: function (projectId) {
    if(!Roles.userIsInRole(Meteor.user()._id, 'coder', 'waxer')) return "error";
    Meteor.users.update({_id : Meteor.user()._id}, {$set: {"profile.participeTo": projectId}}, {},function(data){
      return data;
    });
  },
  setAvatar: function (userId, imageId) {
    Meteor.users.update({_id : userId}, {$set: {"profile.avatar": imageId}}, {},function(data){
      return data;
    });
  },
  chooseProject: function(projectId) {
    if(!Roles.userIsInRole(Meteor.user()._id, 'admin', 'waxer')) return "error";
    Projects.update({_id : projectId}, {$set: {"choosed": true}}, {},function(data){
      return data;
    });
  },
  unchooseProject: function(projectId) {
    if(!Roles.userIsInRole(Meteor.user()._id, 'admin', 'waxer')) return "error";
    Projects.update({_id : projectId}, {$set: {"choosed": false}}, {},function(data){
      return data;
    });
  }
});
