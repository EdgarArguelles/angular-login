describe('LoginSvc', function () {
  'use strict';
  var api = 'http://localhost:3030';
  var http, cookies, service;

  beforeEach(function () {
    // instantiate the app module
    angular.mock.module('services.login', 'ngCookies');

    // mock the service
    angular.mock.inject(function ($httpBackend, $cookies, LoginSvc) {
      http = $httpBackend;
      cookies = $cookies;
      service = LoginSvc;
    });
  });

  it('should exist', function () {
    expect(service).toBeDefined();
  });

  it('should call ping to API', function () {
    spyOn(cookies, 'get').and.returnValue('valid');
    spyOn(cookies, 'put').and.returnValue('');
    http.expect('POST', api + '/ping').respond(200, {token: 'newvalid'});

    service.ping().then(function (result) {
      expect(result).toEqual({token: 'newvalid'});
      expect(cookies.get).toHaveBeenCalledWith('sessionToken');
      expect(cookies.put).toHaveBeenCalledWith('sessionToken', result.token);
    }, function (result) {
      expect(result).toBeUndefined();
    });

    http.flush();
  });

  it('should call login to API', function () {
    spyOn(cookies, 'put').and.returnValue('');
    http.expect('POST', api + '/login').respond(200, {token: 'newvalid'});

    service.login({}).then(function (result) {
      expect(result).toEqual({token: 'newvalid'});
      expect(cookies.put).toHaveBeenCalledWith('sessionToken', result.token);
    }, function (result) {
      expect(result).toBeUndefined();
    });

    http.flush();
  });

  it('should call logout to API', function () {
    spyOn(cookies, 'get').and.returnValue('valid');
    spyOn(cookies, 'remove').and.returnValue('');
    http.expect('POST', api + '/logout').respond(200, {msg: 'success'});

    service.logout().then(function (result) {
      expect(result).toEqual({msg: 'success'});
      expect(cookies.get).toHaveBeenCalledWith('sessionToken');
      expect(cookies.remove).toHaveBeenCalledWith('sessionToken');
    }, function (result) {
      expect(result).toBeUndefined();
    });

    http.flush();
  });
});