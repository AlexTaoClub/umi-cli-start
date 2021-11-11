const proxy: any = {
  development: {
    '/apiLogin': {
      target: 'https://baidu.com.com/',
      changeOrigin: true,
      pathRewrite: { '^/apiLogin': '' },
    },
    '/api': {
      target: 'https://baidu.com.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  test: {
    '/api': {
      target: 'https://baidu.com.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  product: {
    '/api': {
      target: 'https://baidu.com.com/',
      changeOrigin: true,
      pathRewrite: { '^/': '' },
    },
  },
};
export default proxy;
