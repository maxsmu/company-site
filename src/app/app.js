/**
 * @Author: Micheal
 * @Date: 2017-03-31 15:16:17
 * @Last Modified by: Micheal
 * @Last Modified time: 2017-03-31 18:04:08
 * @GitHub: https://github.com/maxsmu
*/
import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngResource from 'angular-resource';
import uiRouter from 'angular-ui-router';

export default angular
  .module('app', [
    ngAnimate,
    ngResource,
    uiRouter
  ])
  // .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
  //   $stateProvider
  //     .state('/', {
  //       url: '/',
  //       redirectTo: '/dashboard'
  //     })
  //   $urlRouterProvider.otherwise("/dashboard");
  // }])
  .name;
