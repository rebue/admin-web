import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoRegistry from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { themePreprocessorPlugin } from '@zougt/vite-plugin-theme-preprocessor';
import path from 'path';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import ReactivityTransform from '@vue-macros/reactivity-transform/vite';

// https://vitejs.dev/config/
// mode:
//      命令 vite 的 mode 为 development
//      命令 vite build 的 mode 为 production
//      如果想自定义mode，运行命令 vite build --mode <自定义mode名称>
export default defineConfig(({ command, mode }) => {
    // 根据当前工作目录中的 `mode` 加载 .env 文件
    // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
    // https://cn.vitejs.dev/config/#using-environment-variables-in-config
    const env = loadEnv(mode, process.cwd(), '');

    return {
        // 项目根目录(index.html所在的目录)
        root: path.resolve(__dirname, 'src'),
        // 公共基础路径(网站的subpath，可以在.env系列文件中配置)
        base: env.VITE_BASE_URL,
        build: {
            // 编译输出路径
            outDir: '../dist',
        },
        // resolve: {
        //     alias: {
        //         '@': path.resolve(__dirname, 'src'),
        //     },
        // },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                },
                scss: {
                    additionalData: `@use "element-plus/theme-chalk/src/common/var.scss" as *;`,
                },
            },
        },
        plugins: [
            vue({}),
            // Reactivity Transform
            // https://vue-macros.sxzz.moe/zh-CN/features/reactivity-transform.html
            ReactivityTransform(),
            // 图标库插件
            // https://github.com/unplugin/unplugin-icons
            Icons({
                // vue3编译器(需要安装@vue/compiler-sfc)
                compiler: 'vue3',
                // 自动安装，可以检测import来自动安装图标集(实验性功能)
                autoInstall: true,
            }),
            // 按需自动导入API，可以免写import语句
            // https://github.com/unplugin/unplugin-auto-import
            AutoImport({
                // 应用在哪些文件上
                include: [
                    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                    /\.vue$/,
                    /\.vue\?vue/, // .vue
                    /\.md$/, // .md
                ],
                // 全局导入
                imports: [
                    // 内置
                    'vue',
                    'pinia',
                    // 自定义
                    {
                        axios: [
                            // import { default as axios } from 'axios'
                            ['default', 'axios'],
                        ],
                    },
                    {
                        'vue-router': [
                            'createRouter',
                            'createWebHashHistory',
                            'onBeforeRouteLeave',
                            'onBeforeRouteUpdate',
                        ],
                    },
                ],
                // // 第三方提供的自动导入解析器
                // resolvers: [
                //     // AntDesignVueResolver(),
                //     ElementPlusResolver(),
                //     // 自动导入图标组件，可以免写import语句
                //     IconsResolver({
                //         // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
                //         // {prefix}-{collection}-{icon-name}
                //         prefix: 'icon',
                //     }),
                // ],
                // 在项目根目录下自动生成auto-imports.d.ts文件
                dts: true,
            }),
            // 按需自动注册组件
            // https://github.com/unplugin/unplugin-vue-components
            AutoRegistry({
                // 查找自定义组件的位置
                dirs: ['component', 'view', 'assets/icon'],
                // 第三方提供的自动注册解析器
                resolvers: [
                    // AntDesignVueResolver(),
                    ElementPlusResolver(),
                    // 自动导入图标组件，可以免写import语句
                    IconsResolver({
                        // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
                        // {prefix}-{collection}-{icon-name}
                        prefix: 'icon',
                    }),
                ],
            }),
            // 创建动态主题切换 https://github.com/GitOfZGT/vite-plugin-theme-preprocessor/blob/master/README.zh.md
            themePreprocessorPlugin({
                scss: {
                    // 是否启用任意主题色模式，这里不启用
                    arbitraryMode: false,
                    // 提供多组变量文件
                    multipleScopeVars: [
                        {
                            scopeName: 'default',
                            // 变量文件内容不应该夹带样式代码，设定上只需存在变量
                            path: path.resolve('src/assets/theme/default.scss'),
                        },
                        {
                            scopeName: 'dark',
                            path: path.resolve('src/assets/theme/dark.scss'),
                        },
                    ],
                    // css中不是由主题色变量生成的颜色，也让它抽取到主题css内，可以提高权重
                    // includeStyleWithColors: [
                    //     {
                    //         color: '#ffffff',
                    //         // 此类颜色的是否跟随主题色梯度变化，默认false
                    //         // inGradient: true,
                    //     },
                    // ],
                    // 默认取 multipleScopeVars[0].scopeName
                    defaultScopeName: 'dark',
                    // 在生产模式是否抽取独立的主题css文件，extract为true以下属性有效
                    extract: true,
                    // 独立主题css文件的输出路径，默认取 viteConfig.build.assetsDir 相对于 (viteConfig.build.outDir)
                    outputDir: '',
                    // 会选取defaultScopeName对应的主题css文件在html添加link
                    themeLinkTagId: 'theme-link-tag',
                    // "head"||"head-prepend" || "body" ||"body-prepend"
                    themeLinkTagInjectTo: 'head',
                    // 是否对抽取的css文件内对应scopeName的权重类名移除
                    removeCssScopeName: false,
                    // 可以自定义css文件名称的函数
                    customThemeCssFileName: (scopeName) => scopeName,
                },
            }),
        ],
    };
});
