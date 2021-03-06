// Ionic Starter App
(function () {

  'use strict';

  angular
    .module('app', ['ionic', 'auth0.lock', 'angular-jwt'])
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', 'lockProvider', 'jwtOptionsProvider'];

  function config($stateProvider, $urlRouterProvider, lockProvider, jwtOptionsProvider) {
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('home', {
        url: '/',
        templateUrl: 'components/home/home.html'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'components/login/login.html'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

    lockProvider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
      options: {
        auth: {
          redirect: false,
          params: {
            scope: 'openid',
            device: 'Mobile device'
          }
        },
        theme: {
          logo: 'https://auth0.com/lib/homepage/img/logo-tmz.svg',
          primaryColor: "#b81b1c"
        },
        languageDictionary: {
          title: "Log me in"
        }
      }
    });

    // Configuration for angular-jwt
    jwtOptionsProvider.config({
      tokenGetter: function() {
        return localStorage.getItem('id_token');
      },
      whiteListedDomains: ['localhost'],
      unauthenticatedRedirectPath: '/login'
    });

  }

})();
