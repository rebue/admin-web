/// <reference types="vite/client"

import { Ro } from '@/ro/Ro';

declare type RequestFunction = (config: AxiosRequestConfig, promptMsg?: PromptMsg) => Promise<Ro>;

declare interface Request {
    get: RequestFunction;
    post: RequestFunction;
    put: RequestFunction;
    del: RequestFunction;
}

export {};

declare module 'vue' {
    interface ComponentCustomProperties {
        /** 提供HTTP请求函数的对象 */
        $request: Request;
    }
}
