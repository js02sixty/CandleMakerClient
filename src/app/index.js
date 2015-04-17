'use strict';

angular.module('cmApp', ['restangular', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('products', {
        url: '/products',
        templateUrl: 'app/products/products.html',
        controller: 'ProductCtrl'
      });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(false);
  })
;
