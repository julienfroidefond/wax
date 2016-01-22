
SSR.compileTemplate('commentEmail', Assets.getText('email-new-comment.html'));
SSR.compileTemplate('likeEmail', Assets.getText('email-new-like.html'));
SSR.compileTemplate('projectEmail', Assets.getText('email-new-project.html'));

Meteor.methods({
    sendNewCommentMail: function (projectId, userCommentId) {

        var proj = Projects.findOne(projectId);
        if(proj){
            var owner = Meteor.users.findOne(proj.owner);
            var userComment = Meteor.users.findOne(userCommentId);

            if(owner._id != userComment._id || owner.emails[0].address == "jfroidefond@atixnet.fr"){

                var emailData = {
                    name: proj.name,
                    url : "http://wax.atixnet.fr/projects/" + proj._id,
                    commenter : userComment.emails[0].address
                };

                var emailTo = process.env.IS_PROD && process.env.IS_PROD=="true" ? owner.emails[0].address : "jfroidefond@atixnet.fr";

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

            if(owner._id != liker._id || owner.emails[0].address == "jfroidefond@atixnet.fr"){

                var emailData = {
                    name: proj.name,
                    url : "http://wax.atixnet.fr/projects/" + proj._id,
                    liker : liker.emails[0].address
                };

                var emailTo = process.env.IS_PROD && process.env.IS_PROD=="true" ? owner.emails[0].address : "jfroidefond@atixnet.fr";

                Email.send({
                    to: emailTo,
                    from: "WAX Admin <jfroidefond@atixnet.fr>",
                    subject: "Nouveau like sur \""+proj.name+"\"",
                    html: SSR.render('likeEmail', emailData )
                });
            }

        }
    },
    sendNewProjectMail: function(projectId){

        var projects = Projects.find({});
        var consolidateProjects = [];
        var cpt=0;
        projects.forEach(function (project) {
          if(project){
            cpt++;
            var owner = Meteor.users.findOne(project.owner);
            var image = Images.findOne(project.image);

            var imgUrl = "http://wax.atixnet.fr/atixnet-large.png";
            if(image) imgUrl = "http://wax.atixnet.fr/"+image.url();
            var isRight = (cpt%2 == 0);
            consolidateProjects.push({
              name: project.name,
              description: project.description,
              url : "http://wax.atixnet.fr/projects/" + project._id,
              creator : owner.emails[0].address,
              image: imgUrl,
              right: isRight
            })
          }
        });

        var proj = Projects.findOne(projectId);
        var owner = Meteor.users.findOne(proj.owner);

        var emailData = {
          projects: consolidateProjects,
          newProjectName: proj.name,
          newProjectOwner: owner.emails[0].address,
          newProjectUrl: 'http://wax.atixnet.fr/projects/'+proj._id
        };

        var emailTo = process.env.IS_PROD && process.env.IS_PROD=="true" ? "ToutAtixnet@atixnet.fr" : "jfroidefond@atixnet.fr";

        Email.send({
          to: emailTo,
          from: "WAX Admin <jfroidefond@atixnet.fr>",
          subject: "Projets",
          html: SSR.render( 'projectEmail', emailData )
        });

    }
});
