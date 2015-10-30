angular.module('waxYeoAnguApp', [
  'angular-meteor',
  'ui.router',
  'ui.bootstrap',
  'angularUtils.directives.dirPagination',
  'ngFileUpload',
  'ngImgCrop',
  'ngAnimate',
  'summernote',
  'ngSanitize',
  'angular-owl-carousel'
]);

onReady = function() {
  angular.bootstrap(document, ['waxYeoAnguApp']);
};

if(Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
