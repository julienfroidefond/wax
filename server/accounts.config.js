'use strict'

Accounts.emailTemplates.siteName = "WAX";
Accounts.emailTemplates.from = "WAX Admin <jfroidefond@atixnet.fr>";
Accounts.emailTemplates.resetPassword.subject = function (user) {
    return "Bienvenue au WAX";
};
Accounts.emailTemplates.resetPassword.html = function (user, url) {
   return '<table><tr>'+
         '<td><img width="100" align="center" src="http://localhost:3000/WAX-logo-extended.png"/></td>' +
         '<td style="padding-left:50px;"><p>Pour activer ton compte et changer de mot de passe, clique sur le lien ci-dessous : </p>' + url+"</td>"+
         '</tr></table>';
};
