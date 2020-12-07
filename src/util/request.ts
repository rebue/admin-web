import axios from 'axios';
import env from '@/env';
import { message } from 'ant-design-vue';
// import store from '@/store';
// import { getToken } from '@/utils/auth';

const codeMessage = {
    ETIMEDOUT: '网络断开或服务器异常，请稍后重试',
    'Error: Network Error': '网络断开或服务器异常，请稍后重试',
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

// create an axios instance
const instance = axios.create({
    baseURL: env.requestBaseUrl, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000, // request timeout
});

// request interceptor
instance.interceptors.request.use(
    config => {
        console.log('request config', config);
        // TODO 拦截请求，将token加入header
        // // do something before request is sent

        // if (store.getters.token) {
        //     // let each request carry token
        //     // ['X-Token'] is a custom headers key
        //     // please modify it according to the actual situation
        //     config.headers['X-Token'] = getToken();
        // }
        return config;
    },
    error => {
        // do something with request error
        console.log('request error', error); // for debug
        // const msg =
        //     (error.response && error.response.status && codeMessage[error.response.status]) || '未知错误:' + error;
        const msg = '请求超时';
        message.info('msg');
        return Promise.resolve({ result: 0, msg });
    }
);

// response interceptor
instance.interceptors.response.use(
    response => {
        console.log('response', response); // for debug
        return response.data;
    },
    error => {
        // do something with request error
        console.log('response error', error); // for debug
        console.log('response error status', error.status); // for debug
        const msg = (error.status && codeMessage[error.status]) || codeMessage[error] || '未知错误:' + error;
        message.info(msg);
        return Promise.resolve({ result: 0, msg });
    }
);

export default instance;
