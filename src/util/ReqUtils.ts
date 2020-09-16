// import env from '@/env';
// /**
//  * 请求的工具类
//  */
// import axios from 'axios';

// export interface Ro {
//     result: number;
//     msg: string;
//     extra: any;
// }

// /**
//  * 发出GET请求
//  */
// export function httpGet(options: any) {
//     // 初始化options
//     const defaultOptions = {
//         method: 'GET', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
//     };
//     const newOptions = { ...defaultOptions, ...options };
//     return request(newOptions);
// }

// /**
//  * 发出POST请求
//  */
// export function httpPost(options: any) {
//     // 初始化options
//     const defaultOptions = {
//         method: 'POST', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
//     };
//     const newOptions = { ...defaultOptions, ...options };
//     return request(newOptions);
// }

// /**
//  * 发出PUT请求
//  */
// export function httpPut(options: any) {
//     // 初始化options
//     const defaultOptions = {
//         method: 'PUT', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
//     };
//     const newOptions = { ...defaultOptions, ...options };
//     return request(newOptions);
// }

// /**
//  * 发出DELETE请求
//  */
// export function httpDelete(options: any) {
//     // 初始化options
//     const defaultOptions = {
//         method: 'DELETE', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
//     };
//     const newOptions = { ...defaultOptions, ...options };
//     return request(newOptions);
// }

// function request(options: any): Promise<Ro> {
//     // const newOptions = { ...options };
//     // 根据环境设置url
//     options.url = env.genUrl(options.url);

//     console.log('request options', options);

//     return new Promise((resolve: any, reject: any) => {});
// }
