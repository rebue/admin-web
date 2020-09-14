// 调试时候的端口号
const port = process.env.port || process.env.npm_config_port || 13080;

module.exports = {
    devServer: {
        port,
        // 调试时自动打开浏览器
        open: true,
    },
};
