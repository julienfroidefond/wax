
// SSR.compileTemplate('htmlEmail', Assets.getText('email-news.html'));
//
// var projects = Projects.find({});
// var consolidateProjects = [];
// var cpt=0;
// projects.forEach(function (project) {
//   if(project){
//     cpt++;
//     var owner = Meteor.users.findOne(project.owner);
//     var image = Images.findOne(project.image);
//
//     var imgUrl = "http://wax.atixnet.fr/atixnet-large.png";
//     if(image) imgUrl = "http://wax.atixnet.fr/"+image.url();
//     var isRight = (cpt%2 == 0);
//     consolidateProjects.push({
//       name: project.name,
//       description: project.description,
//       url : "http://wax.atixnet.fr/projects/" + project._id,
//       creator : owner.emails[0].address,
//       image: imgUrl,
//       right: isRight
//     })
//   }
// });
//
// var emailData = {
//   projects: consolidateProjects,
//   newProjectName: 'alo',
//   newProjectOwner: 'Julien',
//   newProjectUrl: 'http://wax.atixnet.fr/projects/ozfiuahfzao'
// };
//
// // var owner = Meteor.users.findOne(proj.owner);
// // var emailTo = owner.emails[0].address;
//
// process.env.MAIL_URL = "smtp://wax@atixnet.net:Mot2passe@bonnie2.atixnet.net:25/";
//
// Email.send({
//   to: "jfroidefond@atixnet.fr",
//   from: "WAX Admin <jfroidefond@atixnet.fr>",
//   subject: "Projets",
//   html: SSR.render( 'htmlEmail', emailData )
// });
