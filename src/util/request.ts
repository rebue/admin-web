import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { isSimulateNetDelay, requestBaseUrl } from '@/env';
import { message } from 'ant-design-vue';
import { Ro } from '@/ro/Ro';
import router from '@/router/router';

const codeMessage = {
    ETIMEDOUT: '请求超时，请稍后重试',
    ECONNABORTED: '请求超时，请稍后重试',
    200: '服务器成功返回请求的数据',
    201: '新建或修改数据成功',
    202: '一个请求已经进入后台排队（异步任务）',
    204: '删除数据成功',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
    401: '用户认证失败（令牌、用户名、密码错误）',
    403: '用户认证通过，但是未被授权访问该资源',
    404: '请求的地址不存在',
    406: '请求的格式不可得',
    410: '请求的资源被永久删除，且不会再得到的',
    422: '当创建一个对象时，发生一个验证错误',
    500: '服务器发生错误，请检查服务器',
    502: '网关错误',
    503: '服务不可用，服务器暂时过载或维护',
    504: '网关超时',
};

// create an axios instance
const instance = axios.create({
    baseURL: requestBaseUrl, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000, // request timeout
});

// request interceptor
instance.interceptors.request.use(
    config => {
        // console.log('request config', config);

        // 是否模拟网络延迟
        if (isSimulateNetDelay) {
            console.log('模拟网络延迟');
            return new Promise(resolve => setTimeout(() => resolve(config), 1000));
        }

        // 默认参数序列化方法传递数组参数的时候会缺失索引
        config.paramsSerializer = params => {
            return qs.stringify(params);
        };

        return config;
    },
    error => {
        // do something with request error
        console.log('request error', error); // for debug
        const msg = codeMessage['ECONNABORTED'];
        message.error('msg');
        return Promise.reject({ result: 0, msg });
    }
);

// 发出请求
function request(config: AxiosRequestConfig): Promise<Ro> {
    if (config.method?.toUpperCase() === 'GET' && config.data) {
        throw new Error('Axios的GET请求不能使用body传参，请将参数放入params属性而不是data');
    }

    return instance
        .request(config)
        .then(resp => {
            //console.log('response', resp);
            const ro = resp.data as Ro;
            if (ro.result > 0) {
                if (ro.msg) message.info(ro.msg);
                return resp.data;
            } else {
                return Promise.reject({ result: 0, msg: ro.msg });
            }
        })
        .catch(err => {
            console.dir('response error', err);
            // 错误提示信息
            const msg =
                (err.response && err.response.status && codeMessage[err.response.status]) ||
                (err.code && codeMessage[err.code]) ||
                err.msg ||
                '未知错误:' + err;
            message.error(msg);
            if (err.response && err.response.status) {
                if (err.response.status === 401) {
                    router.push({ path: `/sign-in?redirect=${router.currentRoute.path}` });
                    return;
                } else if (err.response.status === 403) {
                    router.push({ path: `/` });
                    return;
                }
                return Promise.reject({ result: 0, msg, code: err.response.status });
            } else if (err.code && codeMessage[err.code]) {
                return Promise.reject({ result: 0, msg, code: err.code });
            } else {
                return Promise.reject({ result: 0, msg });
            }
        });
}

export default {
    get(config: AxiosRequestConfig): Promise<Ro> {
        config.method = 'GET';
        return request(config);
    },
    post(config: AxiosRequestConfig): Promise<Ro> {
        config.method = 'POST';
        return request(config);
    },
    put(config: AxiosRequestConfig): Promise<Ro> {
        config.method = 'PUT';
        return request(config);
    },
    delete(config: AxiosRequestConfig): Promise<Ro> {
        config.method = 'DELETE';
        return request(config);
    },
};
