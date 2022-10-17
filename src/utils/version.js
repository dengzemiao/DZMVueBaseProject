// 使用细节：
// 1、导入方式：在 src 文件夹中使用可以 const version = require('@/utils/version') 这样引入使用，在根目录也就是 src 之外的文件夹则只能 const version = require('./src/utils/version') 这样引入使用

// 引入请求库（如果想使用 axios 请求，打开注释即可，下面 get 方法中也需要打开注释，默认使用JS原生请求）
// const axios = require('axios')
// 引入文件管理模块（基于 node 环境，如果为原生前端开发，则注释掉 fs 相关的代码即可，直接手动创建一个文件使用 get 方法获取即可，注意统一存储内容格式看 create 方法注释）
const fs = require('fs')

// 本地版本号缓存 key
const storageKey = 'currentVersion'

// 创建版本文件（由于 fs 基于 node，且只需要每次编译时创建更新一遍，所以推荐放置于 vue.config.js 文件顶部使用，然后使用 build 命令时会被成功执行创建好文件）
// path: 文件路径以及文件名称（例如：verify.text, public/verify.json 都是存在 public 文件夹中）
// version: 版本号（例如：版本号、时间戳 ...，统一存储内容为：{ version: xxx }）
// result: 回调创建于写入结果
function create (path = 'public/verify.json', version = (new Date().getTime()), result) {
  // 在指定目录中添加校验文件
  fs.writeFile(path, JSON.stringify({ version }), (err) => {
    const isOK = !!err
    if (result) { result({ isOK }) }
  })
}

// 获取版本号（下面 get 方法）升级版（返回：当前版本号、是否有新版本。样例：{ version: xxx，new: true }，并缓存好新的版本号，可选择直接刷新页面。vue 推荐放到路由守卫 router.afterEach(路由跳转后) 回调中，切换页面时随时检查版本是否更新，这个请求很快的，占用的时间几乎可以忽略，而且就是切换页面完成之后，就算失败或者网不好也不影响正常操作）
// path: 看下面 get 方法中的注释
// isReload: 如果有新版本使用，是否重新加载当前页面，强制浏览器重服务器获取当前页面资源，false 为后续自行手动刷新
function getPro (path = 'verify.json', isReload = true) {
  return new Promise((resolve, reject) => {
    // 获取版本号
    get(path).then(res => {
      // 服务器版本号
      const version = res.version
      // 检查是否有新版本
      const isNew = isNewAvailable(version)
      // 缓存版本号
      save(version)
      // 有新版本的话是否重新从服务器加载页面数据
      if (isNew && isReload) { reload() }
      // 返回
      resolve({ version: version, new: isNew })
    }).catch(err => {
      // 返回
      reject(err)
    })
  })
}

// 获取版本号（返回：当前版本号。样例：{ version: xxx }，vue 推荐放到路由守卫 router.afterEach(路由跳转后) 回调中，切换页面时随时检查版本是否更新，这个请求很快的，占用的时间几乎可以忽略，而且就是切换页面完成之后，就算失败或者网不好也不影响正常操作）
// path: 服务器文件路径（例如上 create() 中的路径，文件存 build 后存放在 public 文件夹中，服务器路径则直接域 + 文件名既可，如果为原生前端开发也是一样）
function get (path = 'verify.json') {
  // 服务器文件路径
  const url = `${ window.location.origin }/${ path }?timestamp=${ new Date().getTime() }`
  
  // axios 请求
  // return new Promise((resolve, reject) => {
  //   // 获取内容
  //   axios.get(url).then(res => {
  //     resolve(res)
  //   }).catch(err => {
  //     reject(err)
  //   })
  // })

  // JS原生请求
  return new Promise((resolve, reject) => {
    // 创建 XMLHttpRequest 对象
    var xhr = null
    if (window.XMLHttpRequest) {
      // 现代主流浏览器的写法
      xhr = new XMLHttpRequest()
    } else {
      // IE浏览器的写法
      xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
    // 创建网络请求对象
    xhr.open('get', url, true)
    // 发送请求
    xhr.send()
    // 请求回调
    xhr.onreadystatechange = () => {
      // 连接成功
      if (xhr.status === 200) {
        // 请求成功
        if (xhr.readyState === 4) {
          // 返回
          resolve(JSON.parse(xhr.responseText))
        }
      } else {
        // 连接失败
        reject(new Error('获取失败'))
      }
    }
  })
}

// 缓存版本号
// version: 版本号（服务器获取到的版本号）
function save (version) {
  localStorage.setItem(storageKey, version)
}

// 检查是否有新版本（true：有新版本 false：没有新版本）
// version: 版本号（服务器获取到的版本号）
function isNewAvailable (version) {
  // 没值（不清楚是否为新版本，默认返回 false, 如果这种情况下需要刷新，可修改返回 true）
  if (!version) { return false }
  // 获取本地缓存的版本号
  const storageVersion = localStorage.getItem(storageKey)
  // 本地没有版本号，说明本机第一次加载，不算新版本
  if (!storageVersion || storageVersion === 'undefined') { return false }
  // 本地有版本号，进行对比
  return `${version}` !== `${storageVersion}`
}

// 刷新当前网页
function reload () {
  // 重新加载当前页面，强制浏览器重服务器获取当前页面资源
  window.location.reload(true)
}

// 导出
module.exports = {
  // 创建版本文件
  create,
  // 获取版本号
  get,
  // 获取版本号升级版
  getPro,
  // 缓存版本号
  save,
  // 检查是否有新版本
  isNewAvailable,
  // 刷新当前页面，强制浏览器重服务器获取当前页面资源
  reload
}

