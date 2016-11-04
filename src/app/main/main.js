'use strict';
(function () {
  require('./main.tpl.html');
  require('../services/login-svc');

  angular.module('main', ['main.tpl.html', 'services.login'])
    .config(Config)
    .controller('MainCtrl', MainCtrl);

  function Config($stateProvider) {
    $stateProvider.state('main', {
      url: '/main',
      views: {
        main: {
          controller: 'MainCtrl as vm',
          templateUrl: 'main.tpl.html',
          resolve: {
            logged: function (LoginSvc) {
              return LoginSvc.ping();
            }
          }
        }
      }
    });
  }

  function MainCtrl($location, LoginSvc) {
    this.logout = function () {
      LoginSvc.logout().then(
        function () {
          $location.path('/login');
        }
      );
    };
  }
})();
