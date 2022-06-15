# Electron Demon Template

## 模板说明

开箱即用，结构清晰，使用了目前最新的Electron19 + Vite2 + Vue3 + Naive-ui2

## 快速开始

```sh
git clone https://github.com/magic-create/electron_demon
```
## 目录结构

```tree
├── build                     打包的脚本以及模板文件，正常无需变动
|   ├── development.js
|   ├── index.html
|   ├── production.js
|   ├── wait.js
|   ├── webpack.js
|
├── config                    项目配置和主程，根据实际需求调整
|   ├── icons
|   ├── build.js
|   ├── loading.html
|   ├── main.js
|
├── demon-ui                  封装好的一些结构组件和方法，可改可不改
|   ├── libs
|   ├── index.js
|
├── dist                      调试或打包后，会自动生成，按照现有配置打包后的目录
|   ├── build
|   └── renderer
|
├── src					vue代码
|   ├── app				通用内容
|   ├── views				视图内容
|   ├── Frame.vue			入口视图
|   └── main.js				启动文件
```

## 使用步骤

1. 安装依赖 npm install
2. 开发调试 npm run dev
3. 打包编译 npm run build

## 网络问题请添加文件(.npmrc)

```
registry=https://registry.npm.taobao.org/
sass_binary_site=http://npm.taobao.org/mirrors/node-sass/
electron_mirror=http://npm.taobao.org/mirrors/electron/
```

## 特殊申明

本模板理论上只内部使用，如有问题请自行解决，概不提供服务

最终解释权归魔网天创信息科技:尘兵所属