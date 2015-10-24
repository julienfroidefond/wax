'use strict'

angular.module('waxYeoAnguApp')
.controller('MainCtrl', function($scope, $meteor) {
    $("#team").owlCarousel({
          navigation: false, // Show next and prev buttons       // 49
          slideSpeed: 300,                                       // 50
          paginationSpeed: 400,                                  // 51
          autoHeight: true,                                      // 52
          itemsCustom: [[0, 1], [450, 2], [600, 2], [700, 2], [1000, 4], [1200, 4], [1400, 4], [1600, 4]]
      });
});
