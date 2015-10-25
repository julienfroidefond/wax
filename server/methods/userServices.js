
Meteor.methods({
    setParticipeTo: function (userId, projectId) {
        Meteor.users.update({_id : userId}, {$set: {"profile.participeTo": projectId}}, {},function(data){
            return data;
        });
    }
});



Meteor.methods({
    setAvatar: function (userId, imageId) {
        Meteor.users.update({_id : userId}, {$set: {"profile.avatar": imageId}}, {},function(data){
            return data;
        });
    }
});
