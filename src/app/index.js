'use strict';

angular.module('cmApp', [
    'restangular',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('main', {
        url: "/",
        templateUrl: "app/main/main.html",
        controller: 'MainCtrl'
      })
      .state('main.products', {
        url: "products",
        templateUrl: "app/main/products/products.html",
        controller: 'ProductsCtrl'
      })
      .state('main.about', {
        url: "about",
        templateUrl: "app/main/about/about.html"
      })
      .state('main.contact', {
        url: "about",
        templateUrl: "app/main/about/contact.html"
      })
      .state('cart', {
        url: "cart",
        templateUrl: "app/cart/cart.html"
      });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  })
;
