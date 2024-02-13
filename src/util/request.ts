/**
 * Vue用于HTTP请求的插件
 *
 * 给Vue实例提供 $request 属性，可以进行HTTP请求
 */
import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { simulateNetDelay, requestBasePath, xHttpMethodOverride } from '~/env';
import { Ro } from '~/ro/Ro';

const codeMessage: { [key: string]: string } = {
    ETIMEDOUT: '请求超时，请稍后重试',
    ECONNABORTED: '请求超时，请稍后重试',
    ERR_CANCELED: '用户中断',
    200: '请求成功',
    201: '服务器成功处理了请求，并创建了新的资源',
    202: '服务器已接受请求，但尚未处理',
    204: '服务器成功处理了没有内容的请求',
    300: '响应有多个选择',
    301: '请求的资源被永久移动到新的地址',
    302: '要求客户端临时跳转到新的地址',
    400: '请求格式错误',
    401: '用户认证失败',
    403: '用户未被授权访问该资源',
    404: '请求的地址不存在',
    405: '请求的方法不正确',
    406: '请求头的格式不正确',
    410: '请求的资源被永久删除，且不会再得到的',
    413: '上传的文件太大，超过限制',
    422: '请求格式正确，但是由于含有语义错误，无法响应',
    500: '服务器内部发生错误',
    502: '网关错误',
    503: '服务不可用',
    504: '网关超时',
};

// create an axios instance
const instance = axios.create({
    baseURL: requestBasePath, // request url = baseUrl + request config url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 30000, // request timeout
});

// request interceptor
instance.interceptors.request.use(
    (config) => {
        console.log('request config', config);

        // 是否模拟网络延迟
        if (simulateNetDelay > 0) {
            console.log('模拟网络延迟');
            return new Promise((resolve) => setTimeout(() => resolve(config), simulateNetDelay));
        }
        // 默认参数序列化方法传递数组参数的时候会缺失索引
        config.paramsSerializer = {
            serialize: (params) => {
                return qs.stringify(params);
            },
        };

        // 是否开启了delete、put等请求转换为post
        if (xHttpMethodOverride) {
            if (config.method == 'delete' || config.method == 'put') {
                config.headers['X-HTTP-Method-Override'] = config.method.toUpperCase();
                config.method = 'POST';
            }
        }

        return config;
    },
    (error) => {
        // do something with request error
        console.log('request error', error); // for debug
        const msg = codeMessage['ECONNABORTED'];
        ElMessage.error({ message: msg, duration: 5000 });
        return Promise.reject({ result: 0, msg });
    },
);

export enum PromptMsg {
    /** 提示消息(包括信息和错误) */
    PromptMsg,
    /** 只提示错误(不提示信息) */
    OnlyPromptError,
    /** 不提示 */
    None,
}

// 发出请求
function req(config: AxiosRequestConfig, promptMsg = PromptMsg.OnlyPromptError): Promise<Ro> {
    if (config.method?.toUpperCase() === 'GET' && config.data) {
        throw new Error('Axios的GET请求不能使用body传参，请将参数放入params属性而不是data');
    }

    return instance
        .request(config)
        .then((resp) => {
            console.log('response', resp);

            const data = resp.data;

            if (data.result) {
                const ro = data as Ro;
                if (ro.msg) {
                    // 成功
                    if (ro.result > 0) {
                        if (promptMsg === PromptMsg.PromptMsg) ElMessage.success({ message: ro.msg });
                    }
                    // 警告
                    else if (ro.result !== -2) {
                        if (promptMsg !== PromptMsg.None) ElMessage.warning({ message: ro.msg, duration: 5000 });
                    }
                    // 失败
                    else {
                        if (promptMsg !== PromptMsg.None) ElMessage.error({ message: ro.msg, duration: 5000 });
                    }
                    return ro;
                }
            }

            return data;
        })
        .catch((err) => {
            console.error('response error', err);

            // 错误提示信息
            const msg =
                (err.response && err.response.status && codeMessage[err.response.status]) ||
                (err.code && codeMessage[err.code]) ||
                err.msg ||
                '未知错误:' + err;

            if (promptMsg !== PromptMsg.None) {
                ElMessage.error({ message: msg, duration: 5000 });
            }

            if (err.response && err.response.status) {
                // if (err.response.status === 401) {
                //     router.push({ path: `/sign-in?redirect=${router.currentRoute.path}` });
                //     return;
                // } else if (err.response.status === 403) {
                //     router.push({ path: `/` });
                //     return;
                // }
                return Promise.resolve({ result: 0, msg, code: err.response.status });
            } else if (err.code && codeMessage[err.code]) {
                return Promise.resolve({ result: 0, msg, code: err.code });
            } else {
                return Promise.resolve({ result: 0, msg });
            }
        });
}

export const request = {
    get(config: AxiosRequestConfig, promptMsg?: PromptMsg): Promise<Ro> {
        config.method = 'GET';
        return req(config, promptMsg);
    },
    post(config: AxiosRequestConfig, promptMsg?: PromptMsg): Promise<Ro> {
        config.method = 'POST';
        return req(config, promptMsg);
    },
    put(config: AxiosRequestConfig, promptMsg?: PromptMsg): Promise<Ro> {
        config.method = 'PUT';
        return req(config, promptMsg);
    },
    del(config: AxiosRequestConfig, promptMsg?: PromptMsg): Promise<Ro> {
        config.method = 'DELETE';
        return req(config, promptMsg);
    },
};
