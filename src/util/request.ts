import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { isSimulateNetDelay, requestBaseUrl, xHTTPMethodOverride } from '@/env';
import { message } from 'ant-design-vue';
import { Ro } from '@/ro/Ro';
import router from '@/router/router';
import { getAppIdByUrl } from '@/util/common';
import { hasAuthInfo, removeAuthInfo } from '@/util/cookie';
import { Modal } from 'ant-design-vue';

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
    timeout: 30000, // request timeout
});

// request interceptor
instance.interceptors.request.use(
    config => {
        console.log('request config', config);

        /** 根据路径获取appId, 放到请求头里*/
        // location.pathname /admin-web/platform-admin-web/   /platform-admin-web/
        const appId = getAppIdByUrl();
        if (appId) {
            config.headers['App-Id'] = appId;
        }

        // 是否模拟网络延迟
        if (isSimulateNetDelay) {
            console.log('模拟网络延迟');
            return new Promise(resolve => setTimeout(() => resolve(config), 1000));
        }
        // 默认参数序列化方法传递数组参数的时候会缺失索引
        config.paramsSerializer = params => {
            return qs.stringify(params);
        };

        // 是否开启了delete、put等请求转换为post
        if (xHTTPMethodOverride) {
            if (config.method == 'delete' || config.method == 'put') {
                config.headers['X-HTTP-Method-Override'] = config.method.toUpperCase();
                config.method = 'post';
            }
            // console.log(config);
        }

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
                if (ro.msg) {
                    // post put delete 默认提示，GET默认不提示。Disable-Info控制某些post请求(如验证码)不提示
                    if (config.method != 'GET' && (!config.headers || !config.headers['Disable-Info'])) {
                        message.info(ro.msg);
                    }
                }
                return resp.data;
            } else {
                return Promise.reject({ result: 0, msg: ro.msg });
            }
        })
        .catch(err => {
            console.log('response error', err);
            // 错误提示信息
            const msg =
                (err.response && err.response.status && codeMessage[err.response.status]) ||
                (err.code && codeMessage[err.code]) ||
                err.msg ||
                '未知错误:' + err;
            if (err.msg && !['未获取到session信息', '会话信息已失效,请刷新页面！'].includes(err.msg)) {
                message.error(msg);
            } else {
                Modal.confirm({
                    title: '登录失效',
                    content: '登录会话已失效，请刷新页面重新登录',
                    okText: '刷新页面',
                    onOk() {
                        if (hasAuthInfo()) {
                            removeAuthInfo();
                        }
                        window.location.reload();
                    },
                });
            }
            if (err.response && err.response.status) {
                // if (err.response.status === 401) {
                //     router.push({ path: `/sign-in?redirect=${router.currentRoute.path}` });
                //     return;
                // } else if (err.response.status === 403) {
                //     router.push({ path: `/` });
                //     return;
                // }
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
