'use strict';
(function () {
  require('angular');
  require('angular-ui-router');
  require('./login/login');
  require('./main/main');

  angular.module('app', ['ui.router', 'login', 'main'])
    .config(BaseAppConfig)
    .controller('AppCtrl', AppCtrl);

  function AppCtrl($scope, $log, $state) {
    // Redirect to login if not authorized
    $scope.$on('FailedAuthentication', function () {
      $log.error('Failed Authentication!');
      $state.go('login');
    });
  }

  function BaseAppConfig($urlRouterProvider, $provide, $httpProvider) {
    $urlRouterProvider.otherwise('/main');

    $provide.factory('myHttpInterceptor', function ($rootScope, $q) {
      return {
        response: function (response) {
          return response;
        },
        responseError: function (rejection) {
          switch (rejection.status) {
            case 500 :
              $rootScope.$broadcast('FailedAuthentication');
              break;
            default:
          }
          return $q.reject(rejection);
        }
      };
    });
    $httpProvider.interceptors.push('myHttpInterceptor');
  }
})();
