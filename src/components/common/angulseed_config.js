'use strict'

angular.module('myApp')
  .config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {
    $routeProvider.otherwise({redirectTo: '/module1'});
    //$locationProvider.html5Mode(true);
  }])
  .run(['$rootScope','$location',function($rootScope,$location){
    // do something when myApp run
  }]);