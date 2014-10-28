'use strict';

angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'ngSanitize',

  'ui.bootstrap',

  'myApp.router'
]);

angular.module('myApp.router', ['ngRoute']).config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
  $routeProvider.otherwise({
    redirectTo: '/app'
  });
  $locationProvider.html5Mode(true);
}]);