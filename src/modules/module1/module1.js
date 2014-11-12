'use strict';

angular.module('myApp.module1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/module1', {
    templateUrl: 'modules/module1/module1.html',
    controller: 'Module1Ctrl'
  });
}])

.controller('Module1Ctrl', [function() {

}]);