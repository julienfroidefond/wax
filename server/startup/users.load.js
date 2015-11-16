Meteor.startup(function() {


    // var basePath = process.env.PWD;
    // var fsFile = new FS.File(basePath+'/users.json');
    // console.log(fsFile.attachData);

    if(Meteor.users.find().count() < 29) {
        var basePath = process.env.PWD;
        var fs = Npm.require('fs');
        data = fs.readFileSync(basePath+'/users.json', 'utf8');

        data = JSON.parse(data);
        for(var i in data.users){
            var user = data.users[i];
            console.log("-----TRAITEMENT user : "+ user.username);
            addCloudinaryImage(user, function(res, user){
                if(user.email == 'jfroidefond@atixnet.fr'){
                    var me = Accounts.findUserByEmail("jfroidefond@atixnet.fr");
                    createSampleChat(me);
                    createSampleProject(me);
                }
            });
        }
    }
    var me = Accounts.findUserByEmail("jfroidefond@atixnet.fr");
    createSampleChat(me);
    createSampleProject(me);


    // if(Meteor.users.find().count() < 12) {
    //     var basePath = process.env.PWD;
    //
    //     var fs = Npm.require('fs');
    //     data = fs.readFileSync(basePath+'/users.json', 'utf8');
    //
    //     data = JSON.parse(data);
    //     for(var i in data.users){
    //         var user = data.users[i];
    //
    //         var fsFile = new FS.File(basePath+'/public/users/'+user.avatar);
    //         if(fsFile){
    //             var image = Images.insert(fsFile);
    //             if(image._id){
    //                 var userExists = Accounts.findUserByEmail(user.email);
    //                 if(!userExists){
    //                     console.log("WAX ::: Creation du user : "+ user.email);
    //                     var id = Accounts.createUser({
    //                         username: user.username,
    //                         email: user.email,
    //                         password: user.password,
    //                         profile: {
    //                             participeTo: null,
    //                             avatar: image._id,
    //                             group: user.group,
    //                             firstName: user.firstName,
    //                             lastName: user.lastName
    //                         }
    //                     });
    //                     console.log("WAX ::: Ajout au groupe : "+ user.group);
    //                     Roles.addUsersToRoles(id, user.role, user.group);
    //                 }
    //             }
    //         }
    //     }
    //
    // }
});

function addCloudinaryImage(user, callback){
    var basePath = process.env.PWD;
    Cloudinary.api.resource(user.username,
        Meteor.bindEnvironment(function(result)  {
            if(result.error && result.error.http_code == 404){
                Cloudinary.uploader.upload(basePath+'/public/users/'+user.avatar, Meteor.bindEnvironment(function(res) {
                    addUser(user, res.public_id);
                    return callback(res, user);
                }), { public_id: user.username });
            }else{
                addUser(user, result.public_id);
                return callback(result, user);
            }
        })
    );
}

function addUser(user, imageId){
    var userExists = Accounts.findUserByEmail(user.email);
    if(!userExists){
        console.log("WAX ::: Creation du user : "+ user.email);
        var id = Accounts.createUser({
            username: user.username,
            email: user.email,
            password: user.password,
            profile: {
                participeTo: null,
                avatar: imageId,
                group: user.group,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
        console.log("WAX ::: Ajout au groupe : "+ user.group);
        Roles.addUsersToRoles(id, user.role, user.group);

    }
}

function createSampleChat(user){
    if(Chats.find().count() === 0 && user){
        console.log("WAX ::: Creation d'un chat exemple");
        var chat = {
            "message": "Hello world !",
            "userId": user._id,
            "user": user
        };
        Chats.insert(chat);
    }
}

function createSampleProject(user){
    if(Projects.find().count() === 0 && user){
        console.log("WAX ::: Creation d'un projet exemple");
        var project = {
            "name": "Projet exemple",
            "ownerAvatar": user.profile.avatar,
            "owner": user._id,
            "description": "<p><span style=\"font-style: italic;\">Ceci<\/span> est <span style=\"font-weight: bold;\">mon<\/span> projet.<\/p><p>Lorem <span style=\"background-color: yellow;\">ipsum<\/span>.<\/p>",
            "participants": []
        };
        Projects.insert(project);
    }
}

// fs.readFile('file.json', 'utf8', function (err, data) {
//     if (err) {
//         console.log('Error: ' + err);
//         return;
//     }
//
//     data = JSON.parse(data);
//     console.log(data);
// });
