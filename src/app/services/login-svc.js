'use strict';
(function () {
  require('angular-cookies');

  angular.module('services.login', ['ngCookies'])
    .factory('LoginSvc', LoginSvc);

  function LoginSvc($http, $cookies) {
    var api = 'http://localhost:3030';
    return {
      ping: function () {
        var token = $cookies.get('sessionToken') || 'invalid';
        return $http.post(api + '/ping', {token: token}).then(function (response) {
          $cookies.put('sessionToken', response.data.token);
          return response.data;
        });
      },
      login: function (credentials) {
        var promise = $http.post(api + '/login', credentials).then(function (response) {
          $cookies.put('sessionToken', response.data.token);
          return response.data;
        });
        return promise;
      },
      logout: function () {
        var token = $cookies.get('sessionToken');
        return $http.post(api + '/logout', {token: token}).then(function (response) {
          $cookies.remove('sessionToken');
          return response.data;
        });
      }
    };
  }
})();
