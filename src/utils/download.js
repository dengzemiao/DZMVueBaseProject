// 参考文章 https://blog.csdn.net/zz00008888/article/details/113847294

// 如果通过 DOWLOAD_FILE()、DOWLOAD_FILE_PRO() 下载自定义文件名不生效，则可以使用 DOWLOAD_FILE_URL_PRO() 方法，前者通过 a 标签直接下载获取，后者通过先请求数据在将数据放置 a 标签身上进行下载。

// --------------------- 针对不同代理封装的自用方法

// 代理协议 other
export const PROXY_OTHER = '/ProxyVideo'
// 代理协议 private video
export const PROXY_VIDEO_PRI = '/VideoDownload'
// 代理协议 public video
export const PROXY_VIDEO_PUB = '/VideoPublic'

// 代理地址 other
export const PROXY_URL_OTHER = 'https://file.hepai.video'
// 代理地址 private video
export const PROXY_URL_VIDEO_PRI = 'https://vprivate.hepai.video'
// 代理地址 public video
export const PROXY_URL_VIDEO_PUB = 'https://vpublic.hepai.video'

// 下载文件 所有代理
export function DOWLOAD_FILE_ALL (url, proxy) {
  if (url.includes(PROXY_URL_OTHER) || proxy === PROXY_OTHER) {
    return DOWLOAD_FILE_OTHER(url)
  } else if (url.includes(PROXY_URL_VIDEO_PRI) || proxy === PROXY_VIDEO_PRI) {
    return DOWLOAD_FILE_VIDEO_PRI(url)
  } else if (url.includes(PROXY_URL_VIDEO_PUB) || proxy === PROXY_VIDEO_PUB) {
    return DOWLOAD_FILE_VIDEO_PUB(url)
  } else {
    return DOWLOAD_FILE_OTHER(url)
  }
}

// 下载文件 other
export function DOWLOAD_FILE_OTHER (url) {
  // 检查是否为全链接
  if (url.includes('http')) {
    return DOWLOAD_FILE(url, PROXY_OTHER, PROXY_URL_OTHER)
  } else {
    return DOWLOAD_FILE(url, PROXY_OTHER)
  }
}

// 下载文件 private video
export function DOWLOAD_FILE_VIDEO_PRI (url) {
  // 检查是否为全链接
  if (url.includes('http')) {
    return DOWLOAD_FILE(url, PROXY_VIDEO_PRI, PROXY_URL_VIDEO_PRI)
  } else {
    return DOWLOAD_FILE(url, PROXY_VIDEO_PRI)
  }
}

// 下载文件 private video
export function DOWLOAD_FILE_VIDEO_PUB (url) {
  // 检查是否为全链接
  if (url.includes('http')) {
    return DOWLOAD_FILE(url, PROXY_VIDEO_PUB, PROXY_URL_VIDEO_PUB)
  } else {
    return DOWLOAD_FILE(url, PROXY_VIDEO_PUB)
  }
}

// --------------------- 公共方法

/**
 * @description: 下载文件
 * @param {*} url 参考 DOWLOAD_FILE_PRO()
 * @param {*} proxy 参考 DOWLOAD_FILE_PRO()
 * @param {*} proxyhttp 参考 DOWLOAD_FILE_PRO()
 */
export function DOWLOAD_FILE (url, proxy, proxyhttp) {
  return DOWLOAD_FILE_PRO(url, '', proxy, proxyhttp)
}

/**
 * @description: 下载文件
 * @param {*} url 下载链接。（例如：全链接(http://dowload.file/dzm.png) || 除去代理后剩余的部分链接(/dzm.png))
 * @param {*} filename 下载文件名称，为空则取链接尾部文件名。（例如：dzm.png）
 * @param {*} proxy 配置好的代理协议。(例如：/dowload， /dowload == http://dowload.file)
 * @param {*} proxyhttp 代理协议的链接地址，如果配置则会替换 url 中该段代理链接地址为 proxy 代理协议，所以 proxyhttp 有值，proxy 必须有值。(例如：http://dowload.file)
 */
export function DOWLOAD_FILE_PRO (url, filename, proxy, proxyhttp) {
  // Promise
  return new Promise((resolve, reject) => {
    // 下载地址
    var dowloadURL = url
    // 有代理链接地址，当前链接里面同时存在代理地址可以进行替换
    if (proxyhttp && proxy && dowloadURL.includes(proxyhttp)) {
      // 替换代理链接地址为代理协议
      dowloadURL = dowloadURL.replace(proxyhttp, proxy)
      // 代理链接下载
      DOWLOAD_FILE_URL(dowloadURL, filename)
      // 下载成功
      resolve()
    } else if (proxy) {
      // 将下载链接匹配上代理协议
      dowloadURL = proxy + dowloadURL
      // 代理链接下载
      DOWLOAD_FILE_URL(dowloadURL, filename)
      // 下载成功
      resolve()
    } else {
      // 链接下载
      DOWLOAD_FILE_URL_PRO(dowloadURL, filename).then(() => { resolve() }).catch((err) => { reject(err) })
    }
  })
}

/**
 * @description: 下载指定代理链接 || 当前网页同域名的链接 || .pdf、。xls 等非图片视频链接
 * @param {*} url 拼接好的代理连接
 * @param {*} filename 文件名称
 */
export function DOWLOAD_FILE_URL (url, filename) {
  // 创建一个a节点插入的document
  var a = document.createElement('a')
  // 模拟鼠标click点击事件
  var event = new MouseEvent('click')
  // 设置a节点的download属性值
  a.download = DOWLOAD_FILE_NAME(url, filename)
  // 将需要下载的URL赋值给a节点的href
  a.href = url
  // 触发鼠标点击事件
  a.dispatchEvent(event)
}

/**
 * @description: 不走代理，直接下载指定链接，但是服务器得开启文件访问权限，否则会报跨域错误
 * @param {*} url 非代理的正常全链接
 * @param {*} filename 文件名称
 */
export function DOWLOAD_FILE_URL_PRO (url, filename) {
  // Promise
  return new Promise((resolve, reject) => {
    // 获取链接二进制数据
    fetch(url).then((res) => {
      // 获得二进制数据
      res.blob().then((blob) => {
        // 创建一个a节点
        var a = document.createElement('a')
        // 创建一个可供下载链接
        var url = window.URL.createObjectURL(blob)
        // 将需要下载的URL赋值给a节点的href
        a.href = url
        // 设置节点的download属性值
        a.download = DOWLOAD_FILE_NAME(url, filename)
        // 触发点击事件
        a.click()
        // 释放
        window.URL.revokeObjectURL(url)
        // 获取成功
        resolve()
      }).catch((err) => {
        // 获取失败
        reject(err)
      })
    }).catch((err) => {
      // 获取失败
      reject(err)
    })
  })
  // 简写方式：
  // fetch(url).then(res => res.blob().then(blob => {
  //   // 创建一个a节点
  //   var a = document.createElement('a')
  //   // 创建一个可供下载链接
  //   var url = window.URL.createObjectURL(blob)
  //   // 将需要下载的URL赋值给a节点的href
  //   a.href = url
  //   // 设置节点的download属性值
  //   a.download = DOWLOAD_FILE_NAME(url, filename)
  //   // 触发点击事件
  //   a.click()
  //   // 释放
  //   window.URL.revokeObjectURL(url)
  // }))
}

/**
 * @description: 获取链接文件名
 * @param {*} url 非代理的正常链接
 * @param {*} filename 文件名称
 */
export function DOWLOAD_FILE_NAME (url, filename) {
  // 文件名称
  var fname = filename
  // 没有文件名同时链接有值
  if (!fname && url) {
    // 获得最后一个斜杠坐标
    const index = url.lastIndexOf('/')
    // 从斜杆后一个坐标开始截取
    fname = url.substring(index + 1)
  }
  // 返回
  return fname
}
