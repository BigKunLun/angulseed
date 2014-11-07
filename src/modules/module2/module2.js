'use strict';

angular.module('myApp.module2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/module2', {
    templateUrl: 'modules/module2/module2.html',
    controller: 'module2Ctrl'
  });
}])

.controller('module2Ctrl', [function() {

}]);