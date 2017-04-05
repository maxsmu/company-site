/**
 * @Author: Micheal
 * @Date: 2017-03-31 18:06:35
 * @Last Modified by: Micheal
 * @Last Modified time: 2017-03-31 18:06:35
 * @GitHub: https://github.com/maxsmu
*/
import angular from 'angular';

import './nav.scss';
import template from './nav.tpl.html';
import NavController from './nav.controller';

const componentDDO = {
  template,
  controller: NavController,
  controllerAs: '$ctrl',
  bindings: {}
};

export default angular
  .module('components.nav', [])
  .component('nav', componentDDO)
  .name;
