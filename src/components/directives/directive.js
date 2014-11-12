'use strict';

angular.module('myApp.directive', [])
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);