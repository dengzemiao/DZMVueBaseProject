# DZMVueBaseProject

自用 Vue 空项目框架，只配置常用的项目使用环境

#### 一、项目情况

* 默认 `无 CSS 预处理器`、`无 JS 语法检测`

* 支持 `Antdv UI`、`七牛上传`、`Vuex 数据持久化`、`Axios 基础请求配置`、`其他常用基础配置`、`各种文件下载`

* 如果拷贝到新的工程下，注意隐藏文件是否拷贝成功。

* 下载项目之后先执行 `npm install` 安装依赖库，尝试运行项目

* 如果运行不了项目，可以删除 `node_modules` 与 `package-lock.json` 文件后，执行 `npm install`，等重新安装完成在运行项目，可能依赖包存在缓存，清理一下。

* [Antd 官方文档](https://www.antdv.com/docs/vue/introduce-cn/)

#### 二、[CSS 预处理器安装（Less、Sass、Stylus）](https://blog.csdn.net/zz00008888/article/details/118525946)

* [安装 Less](https://blog.csdn.net/zz00008888/article/details/118516000)

* [antdv 定制主题配置（高低版本配置问题）](https://blog.csdn.net/zz00008888/article/details/118494079)

#### 三、七牛上传管理

* 移除 `七牛`

  ```
  $ npm uninstall qiniu-js --save
  ```

