import './dashboard.scss';
import template from './dashboard.tpl.html';
import dashboardController from './dashboard.controller';

// 路由配置 options
const routers = [
  {
    state: 'app.dashboard',
    config: {
      url: '/dashboard',
      template: template,
      controller: dashboardController,
      controllerAs: '$ctrl'
    }
  }
];

routerConfig.$inject = ['$stateProvider'];
export default function routerConfig($stateProvider) {
  routers.forEach(router => {
    $stateProvider.state(router.state, router.config);
  });
}
