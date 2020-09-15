module.exports = {
    presets: [['@vue/cli-plugin-babel/preset', { modules: false }]],
    plugins: [
        [
            'component',
            {
                libraryName: 'element-ui',
                styleLibraryName: 'theme-chalk',
            },
        ],
        [
            'import',
            {
                libraryName: 'ant-design-vue',
                libraryDirectory: 'es',
                style: 'css', // `style: true` 会加载 less 文件
            },
        ],
    ],
};
