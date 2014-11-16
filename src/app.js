'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.module1',
  'myApp.module2'
]);

// (function(document,$,angular){
//   angular.element(document).ready(function() {
//     $.ajax({
//       url: '/api/get_user_permission',
//       type: "GET",
//       dataType: 'json'
//     }).then(function(data){
//         for (var i = 0; i < data.permissions.length; i++) {
//           data.permissions[i] = data.permissions[i].replace(/\s/g,"");
//         };
//         angular.module('myApp').run(['$rootScope', function($rootScope){
//           $rootScope = data.permissions;
//         }]);
//         angular.bootstrap(document, ['myApp']);
//     });
//   });
// })(document,jQuery,angular);