'use strict';

angular.module('myApp.module2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/module2', {
    templateUrl: 'modules/module2/module2.html',
    controller: 'Module2Ctrl'
  });
}])

.controller('Module2Ctrl', [function() {

}]);