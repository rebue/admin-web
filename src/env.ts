class Env {
    /** 当前运行环境 */
    nodeEnv!: string;
    /** 主机地址 */
    host!: string;
    /** 后端服务器地址 */
    baseUrl!: string;
    /** 图片URL基础路径 */
    picBaseUrl?: string;
    /** 代理规则 */
    proxyRules = new Map<string, string>();
    /** 生成URL */
    genUrl(url: string): string {
        for (const [key, value] of this.proxyRules.entries()) {
            console.log(key, value);
            if (url.startsWith(key)) {
                return value + url.substr(key.length);
            }
        }
        return url;
    }
}

const env = new Env();

console.log('env', process.env);

// env.nodeEnv = 'development';
env.nodeEnv = 'production';

if (env.nodeEnv === 'development') {
    env.host = 'http://192.168.1.166';
    // env.host = 'http://192.168.31.183';
    env.baseUrl = env.host + ':3000';
    env.picBaseUrl = env.host + '/ise-svr/files';
    // 添加代理规则
    env.proxyRules.set('/lck-svr/', env.host + ':9556/');
} else if (env.nodeEnv === 'production') {
    env.host = 'https://lock.bzttech.com';
    // env.host = 'https://wx.cnbzt.net';
    env.baseUrl = env.host;
    env.picBaseUrl = env.host + '/ise-svr/files';
    env.proxyRules.set('/lck-svr/', env.host + '/');
}

console.log('env', env);

export default env;
