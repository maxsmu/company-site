/**
 * @Author: Micheal
 * @Date: 2017-03-31 15:42:46
 * @Last Modified by: Micheal
 * @Last Modified time: 2017-03-31 15:42:46
 * @GitHub: https://github.com/maxsmu
*/
import angular from 'angular';
import dashboardRouter from './dashboard.router';

export default angular
  .module('app.dashboard', [])
  .config(dashboardRouter)
  .name;
