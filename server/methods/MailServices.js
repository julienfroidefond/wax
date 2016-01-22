
SSR.compileTemplate('commentEmail', Assets.getText('email-new-comment.html'));
SSR.compileTemplate('likeEmail', Assets.getText('email-new-like.html'));

Meteor.methods({
    sendNewCommentMail: function (projectId, userCommentId) {

        var proj = Projects.findOne(projectId);
        if(proj){
            var owner = Meteor.users.findOne(proj.owner);
            var userComment = Meteor.users.findOne(userCommentId);

            if(owner._id != userComment._id || owner.emails[0].address == "jfroiodefond@atixnet.fr"){

                var emailData = {
                    name: proj.name,
                    url : "http://wax.atixnet.fr/projects/" + proj._id,
                    commenter : userComment.emails[0].address
                };

                var emailTo = owner.emails[0].address;

                Email.send({
                    to: emailTo,
                    from: "WAX Admin <jfroidefond@atixnet.fr>",
                    subject: "Nouveau commentaire sur \""+proj.name+"\"",
                    html: SSR.render('commentEmail', emailData )
                });
            }

        }
    },
    sendNewLikeMail: function (projectId, userLikerId) {

        var proj = Projects.findOne(projectId);
        if(proj){
            var owner = Meteor.users.findOne(proj.owner);
            var liker = Meteor.users.findOne(userLikerId);

            if(owner._id != liker._id || owner.emails[0].address == "jfroiodefond@atixnet.fr"){

                var emailData = {
                    name: proj.name,
                    url : "http://wax.atixnet.fr/projects/" + proj._id,
                    liker : liker.emails[0].address
                };

                var emailTo = owner.emails[0].address;

                Email.send({
                    to: emailTo,
                    from: "WAX Admin <jfroidefond@atixnet.fr>",
                    subject: "Nouveau like sur \""+proj.name+"\"",
                    html: SSR.render('likeEmail', emailData )
                });
            }

        }
    }
});
