/**
 *运行时配置
 */
import { history } from 'umi';

// 初始加载和路由切换;可更改title
export function onRouteChange({ matchedRoutes = [] }) {
  const title = 'umi-cli';
  const route: any = matchedRoutes[matchedRoutes.length - 1];
  if (matchedRoutes.length) {
    const routeTitle = route?.route?.name;
    if (routeTitle) {
      document.title = `${title}: ${routeTitle}`;
    } else {
      document.title = `${title}`;
    }
  }
}

// 修改路由
export const patchRoutes = (routes = []) => {
  // console.log(routes, 'app - routes');
};

// 渲染页面，可根据响应动态更新路由
export function render(oldRender: () => void) {
  // console.log('app render');
  oldRender();
}
