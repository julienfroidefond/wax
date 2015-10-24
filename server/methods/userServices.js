
Meteor.methods({
  setParticipeTo: function (userId, projectId) {
    Meteor.users.update({_id : userId}, {$set: {"profile.participeTo": projectId}}, {},function(data){
        return data;
    });
},
  getAvatar: function (userId) {
    var user = Meteor.users.findOne({_id : userId});
    return user;
  }
});
