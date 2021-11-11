import { message } from 'antd';
import { extend, ResponseError } from 'umi-request';
import { TokenKey, getCookie, removeCookie } from '@/utils/Cookies';
import { history } from 'umi';
import { stringify } from 'querystring';
import { isProduct } from '../../config/const';
const codeMessage: any = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// 默认错误处理
const errorHandler = (error: ResponseError) => {
  const { response = {} as Response } = error;
  const { status, url } = response;
  if (!response) {
    message.error('网络异常', 2);
    return { message: '网络异常' };
  }
  if (status) {
    const errortext = codeMessage[status] || response.statusText;
    // message.error(`请求错误 ${status} ${errortext}: ${url}`, 2);
    message.error(errortext, 2, () => {});
  }
  return response;
};

// request option
const requestConf = {
  errorHandler, // 默认错误处理
  prefix: '', //
  // 默认请求头
  headers: {
    // 'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  credentials: 'include', // 默认请求是否带上cookie
};

export const requestFile = extend(
  Object.assign({ timeout: 300000, ...requestConf }),
);
const request = extend(Object.assign({ timeout: 12000, ...requestConf }));

//参数配置
request.interceptors.request.use((url, options) => {
  const token = getCookie(TokenKey);
  const { nosign, getResponse, method } = options;
  // 配置服务地址 - beroreUrl
  let beroreUrl = options.beroreUrl ? options.beroreUrl : '/api';
  if (isProduct) beroreUrl = '';
  // 不需要默认参数 - nosign
  if (nosign) {
    return {
      url: beroreUrl + url,
      options: { ...options },
    };
  }
  // 默认参数
  const initQuery = { lang: 'cn', sid: 10, sign: 'x' };
  let assignData = Object.assign(initQuery, options.data);
  let assignParams = Object.assign(initQuery, options.params);
  // 添加请求头
  const headers: any = {};
  if (token) {
    headers[TokenKey] = token;
  }
  let optionsInit: any = {
    ...options,
    headers: headers,
    data: assignData,
    params: assignParams,
  };
  if (method === 'post') {
    delete optionsInit.params;
  } else if (method === 'get') {
    delete optionsInit.data;
  }
  return {
    url: beroreUrl + url,
    options: { ...optionsInit },
  };
});

//拦截器
request.interceptors.response.use(async (response, options) => {
  const { noRedirect = false, responseType, nosign } = options;

  if (responseType == 'blob') {
    return response;
  }

  // 克隆响应对象做解析处理
  // 这里的res就是我们请求到的数据
  const result = await response.clone().json();
  // noRedirect为true时，不需要校验
  if (
    !noRedirect &&
    result &&
    (result.code === '002' || result.code === '004')
  ) {
    message.error('校验失效，请重新登录！');
    // 重定向 - 清除 token
    removeCookie(TokenKey);
    history.replace({
      pathname: '/login',
      search: stringify({
        redirect: window.location.href,
      }),
    });
  }
  return response;
});

export default request;
