'use strict';

/**
* restful sevice Module
*
* Description
*/
angular.module('myApp.userService', ['ngResource']).factory('userFactory',['$resource','$http', function($resource,$http){

    // no restful
    var getUsersByHttp = function(postData){
      return $http.post('/api/getUsers',postData);
    };

    // restful
    var user = $resource('/api/user/:userId',{userId:'@userId'});

    return {
      'getUsersByHttp': getUsersByHttp,
      'user': user
    };
}])