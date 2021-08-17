# admin-web

[TOC]

## 1. 初始化

```sh
yarn
# 或
pnpm install
```

## 2. 检查错误

```sh
yarn lint
# 或
pnpm lint
```

## 3. 开发调试

```sh
yarn dev
# 或
pnpm run dev
```

## 4. 编译

```sh
# 简单编译
yarn build
# 或
pnpm build

# 编译并生成代码模块分析报告(此命令会在 `dist` 目录下生成 `report.html` 文件，可用浏览器打开)
yarn build --report
# 或
pnpm build --report
```

## 5. 上传

```sh
cd <项目根目录>
scp -r dist <服务器地址>:/usr/local/nginx/html/admin-web
```
