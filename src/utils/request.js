import { extend } from 'umi-request';
import { Toast } from 'react-vant';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '处理成功。',
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

const errorHandler = async error => {
  const { response } = error;
  if (response && response.status) {
    let errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    const result = await response.json();

    if (status === 422) {
      let errs = '';
      for (const key in result.errors) {
        errs += result.errors[key][0];
      }
      errorText += `[{${errs}}]`;
    }

    if (status === 400) {
      errorText += `[{${result.message}}]`;
    }

    // message.error(errorText);
  } else if (!response && status === undefined) {
    Toast.fail({
      message: `您的网络发生异常，无法连接服务器`,
      // description: `网络异常`,
    });
  }
  return response;
};

const request = extend({
  errorHandler,
  // prefix: '/api-1.0',
  // credentials: 'include',
});

request.interceptors.request.use((url, options) => {
  const token = window.localStorage.getItem('token') || '';
  const headers = {
    token: token,
  };
  return {
    url: BASE_URL + url,
    options: {
      ...options,
      headers,
    },
  };
});
request.interceptors.response.use(async response => {
  const res = await response?.clone()?.json();
  if (response.status == 200) {
    return res;
  } else {
    Toast.fail({
      message: res.message,
    });
  }
});

export default request;
