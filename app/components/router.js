angular.module('myApp.router', ['ngRoute']).config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
  // index
  $routeProvider.when('/app',{
    templateUrl: '/app/modules/about/about.html'
  })
  .otherwise({
    redirectTo: '/app'
  });

  $locationProvider.html5Mode(true);
}]);