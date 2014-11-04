'use strict';

angular.module('myApp.module1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/module1', {
    templateUrl: '/src/modules/module1/module1.html',
    controller: 'module1Ctrl'
  });
}])

.controller('module1Ctrl', [function() {

}]);