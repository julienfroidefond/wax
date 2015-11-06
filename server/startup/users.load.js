Meteor.startup(function() {


    // var basePath = process.env.PWD;
    // var fsFile = new FS.File(basePath+'/users.json');
    // console.log(fsFile.attachData);

    if(Meteor.users.find().count() < 12) {
        var basePath = process.env.PWD;

        var fs = Npm.require('fs');
        data = fs.readFileSync(basePath+'/users.json', 'utf8');

        data = JSON.parse(data);
        for(var i in data.users){
            var user = data.users[i];

            var fsFile = new FS.File(basePath+'/public/users/'+user.avatar);
            if(fsFile){
                var image = Images.insert(fsFile);
                if(image._id){
                    var userExists = Accounts.findUserByEmail(user.email);
                    if(!userExists){
                        console.log("WAX ::: Creation du user : "+ user.email);
                        var id = Accounts.createUser({
                            username: user.username,
                            email: user.email,
                            password: user.password,
                            profile: {
                                participeTo: null,
                                avatar: image._id,
                                group: user.group,
                                firstName: user.firstName,
                                lastName: user.lastName
                            }
                        });
                        console.log("WAX ::: Ajout au groupe : "+ user.group);
                        Roles.addUsersToRoles(id, user.role, user.group);
                    }
                }
            }
        }

    }
});


// fs.readFile('file.json', 'utf8', function (err, data) {
//     if (err) {
//         console.log('Error: ' + err);
//         return;
//     }
//
//     data = JSON.parse(data);
//     console.log(data);
// });
