'use strict';
(function () {
  angular.module('login', [require('./login.tpl.html')])
    .config(Config)
    .controller('LoginCtrl', LoginCtrl);

  function Config($stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      views: {
        main: {
          controller: 'LoginCtrl as vm',
          templateUrl: 'login.tpl.html'
        }
      }
    });
  }

  function LoginCtrl($location, LoginSvc) {
    this.username = '';
    this.password = '';
    this.error = '';
    this.dataLoading = false;

    this.login = function () {
      this.error = '';
      this.dataLoading = true;
      var credentials = {
        username: this.username,
        password: this.password
      };

      var self = this;
      LoginSvc.login(credentials).then(
        function () {
          $location.path('/main');
        },
        function (response) {
          self.error = response.data.errors[0].message;
        }
      ).then(function () {
        self.dataLoading = false;
      });
    };
  }
})();
