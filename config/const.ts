const isDevelopment =
  process.env.REACT_APP_ENV === 'development' ? true : false;
const isTest = process.env.REACT_APP_ENV === 'test' ? true : false;
const isProduct = process.env.REACT_APP_ENV === 'production' ? true : false;

const publicPath = isProduct ? '/web/' : '/';
const base = '/web';
const doman = isProduct ? 'https://www.baidu.com' : 'https://www.baidu.com';

export { isDevelopment, isTest, isProduct, publicPath, base, doman };
