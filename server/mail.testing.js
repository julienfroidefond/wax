// SSR.compileTemplate('htmlEmail', Assets.getText('email-new-comment.html'));
//
// var proj = Projects.findOne("iwGzC4dRgAf7vCj2K");
// if(proj){
//   var owner = Meteor.users.findOne(proj.owner);
//   console.log(proj);
//   console.log(owner);
//
//   var emailData = {
//     name: proj.name,
//     url : "http://wax.atixnet.fr/projects/" + proj._id
//   };
//
//   var emailTo = owner.emails[0].address;
//   console.log(emailTo);
//
//   process.env.MAIL_URL = "smtp://wax@atixnet.net:Mot2passe@bonnie2.atixnet.net:25/";
//
//   Email.send({
//     to: "jfroidefond@atixnet.fr",
//     from: "WAX Admin <jfroidefond@atixnet.fr>",
//     subject: "Nouveau commentaire sur \""+proj.name+"\"",
//     html: SSR.render( 'htmlEmail', emailData )
//   });
//
// }
