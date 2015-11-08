# wax

Site du WAX (Workshop Atixnet Xperience).

Url : http://atixnet-wax.herokuapp.com/

Hébergé par heroku

Projet Meteorjs. https://www.meteor.com/

Utilisation de : https://www.npmjs.com/package/generator-angular-meteor

Pour le lancer :

git clone https://github.com/julienfroidefond/wax.git

cd wax

meteor

Permet de créer des projets Atixnet du WAX et d'y souscrire.


## Notes :

### Droits :

Utilisation de https://github.com/alanning/meteor-roles

$rootScope.userIsInRole(user, role, group) : permet de savoir si un user a certains roles ou droits

$rootScope.isInRole(role, group) : permet de savoir si le user courant a un certain role

### Automatic users

Pour les besoins Atixnet, tous les comptes utilisateurs sont dans le fichier : users.json.

Au démarrage de l'appli, l'appli va insérer automatiquement tous les users présents dans ce json en leur attribuant les roles, etc.

### Avatars

Les avatars sont gérés sur https://cloudinary.com/.

Ce service permet par son API de cropper les images au besoin. L'appli pousse sur le service cloud toutes les images au startup de l'application Meteor.

Puis on récupère une image par :

$rootScope.uiHelpers.c().url(idToFind, {'hash': options});

cf aussi : https://github.com/Lepozepo/cloudinary
