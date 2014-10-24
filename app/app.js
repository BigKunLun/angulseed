'use strict';

angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'ngSanitize',
  'ui.bootstrap',
  'angular-loading-bar',
  'pasvaz.bindonce'
]);

// get userpermissionlist before angular start
angular.element(document).ready(function() {
  // $.ajax({
  //   url: '/api/user/current',
  //   contentType: "application/json; charset=utf-8",
  //   type: "GET",
  //   dataType: 'json'
  // }).then(function(data){
  //     for (var i = 0; i < data.permissions.length; i++) {
  //       data.permissions[i] = data.permissions[i].replace(/\s/g,"");
  //     };
  //     userPermissionList = data.permissions;
  // });
  angular.bootstrap(document, ['myApp']);
});