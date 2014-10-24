angular.module('myApp.router', ['ngRoute'])
  .config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
    // index
    $routeProvider.when('/',{
      templateUrl: '/modules/index/index.html',
      controller: 'indexCtrl',
    })
    .otherwise({
      redirectTo: ''
    });
    $locationProvider.html5Mode(true);
    }
  ])
