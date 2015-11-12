# wax

Site du **WAX** (*Workshop Atixnet Xperience*).

 - Url : http://atixnet-wax.herokuapp.com/
 - Hébergé par **heroku**
 - Projet **Meteorjs**. https://www.meteor.com/
 - Basé sur **Angularjs**. Utilisation de :
	 - ngAnimate,
	 - ngSanitize,
	 - angular-owl-carousel,
	 - angular-summernote (wysiwyg)
 - Front end en **Bootstrap 3** avec **font awesome** et **moment**
 - **Bower** pour gestion des ressources
 - Utilisation de **Yeoman**: https://www.npmjs.com/package/generator-angular-meteor
 - **Cloudinary** pour les images
 - **spiderable** pour le référencement
 - **Users auto** au démarrage de l'appli

Pour le lancer :

> git clone https://github.com/julienfroidefond/wax.git
> cd wax
> meteor

Permet de créer des projets **Atixnet** du **WAX** et d'y souscrire.

----------

## Notes :

### Droits :

Utilisation de https://github.com/alanning/meteor-roles

> `$rootScope.userIsInRole(user, role, group)` : permet de savoir si un user a certains roles ou droits
> `$rootScope.isInRole(role, group)` : permet de savoir si le user courant a un certain role

### Automatic users

Pour les besoins Atixnet, tous les comptes utilisateurs sont dans le fichier : **users.json.**

Au démarrage de l'appli, l'appli va insérer automatiquement tous les users présents dans ce json en leur attribuant les roles, uploadant les images sur Cloudinary, etc.

### Avatars

Les avatars sont gérés sur **https://cloudinary.com/.**

Ce service permet par son API de **cropper** les images au besoin. L'appli pousse sur le service cloud toutes les images au startup de l'application Meteor.

On récupère, en Angular, une image par :

> $rootScope.uiHelpers.c().url(idToFind, {'hash': options});

cf aussi : https://github.com/Lepozepo/cloudinary
