import { defineConfig } from 'umi';
import routes from './routes';
import proxy from './proxy';
import { isDevelopment, isTest, isProduct, publicPath, base } from './const';
import defaultSettings from './proSettings';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  mfsu: {},
  layout: false,
  proxy: proxy[REACT_APP_ENV || 'development'],
  routes: routes,
  fastRefresh: {},
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  targets: {
    ie: 11,
  },
  terserOptions: {
    compress: {
      warnings: false,
      pure_funcs: ['console.log'],
    },
  },
  inlineLimit: 25,
  dynamicImport: {
    loading: '@/components/Loading',
  },
  // base: base,
  // publicPath: publicPath,
  base: '/',
  publicPath: '/',
  define: {
    'process.env.REACT_APP_ENV': process.env.REACT_APP_ENV,
  },
  manifest: {
    basePath: '/',
  },
});
