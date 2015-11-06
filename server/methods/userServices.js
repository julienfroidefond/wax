
Meteor.methods({
    setParticipeTo: function (userId, projectId) {
        Meteor.users.update({_id : userId}, {$set: {"profile.participeTo": projectId}}, {},function(data){
            return data;
        });
    },
    setAvatar: function (userId, imageId) {
        Meteor.users.update({_id : userId}, {$set: {"profile.avatar": imageId}}, {},function(data){
            return data;
        });
    },
    currentUserIsInRole: function (roles, group) {
        var loggedInUser = Meteor.user()

        if (loggedInUser && (Roles.userIsInRole(loggedInUser, roles, group) || !Roles.userIsInRole(loggedInUser, ['admin'], 'admin'))) {
          return true;
        }
        return false;
    },
    userIsWaxer: function (user) {
        //console.log(Roles.userIsInRole(user._id, ["coder"], "waxer"));
        if (user && (Roles.userIsInRole(user._id, ["coder"], "waxer") || !Roles.userIsInRole(user, ['admin'], 'admin'))) {
          return true;
        }
        return false;
    }
});
