/**
 * require.context的3个参数:
 * 1. 要搜索的文件夹目录
 * 2. 是否还应该搜索它的子目录
 * 3. 以及一个匹配文件的正则表达式
 */
const req = require.context('./', false, /\.svg$/);
req.keys().map(req);
