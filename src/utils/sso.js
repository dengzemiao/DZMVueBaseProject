// 单点登录服务器地址
export const SSO_URL = 'http://api.ad.test.netjoy.com:8090'
// export const SSO_URL = 'https://api-account.tradeplus.net.cn'
// 单点登录回调域名地址
export const SSO_URL_REDIRECT = `${window.location.protocol}//${window.location.host}`

// 导出
// module.exports = {
//   // 检测是否登录
//   SSOCheck,
//   // 登录
//   SSOLogin,
//   // 退出
//   SSOLogout,
//   // 获取可供重定向的URL
//   SSORouter,
//   // 保存当前路由
//   SSOSaveRoute,
//   // 获取上次保存的路由
//   SSOGetRoute,
//   // 清空本地保存的路由
//   SSOClearRoute,
//   // 跳转到保存的路由（replace）
//   SSOGoToSaveRoute,
//   // 是否要清理本地用户信息
//   SSOIsClearLocalToken,
//   // 当前窗口是否为新开的窗口
//   SSOIsNewWindow,
//   // 当前窗口是否为新开的窗口，可设置间隔生效时间
//   SSOIsNewWindowPro
// }

// 下面所有 function 中的 重定向地址(redirect)、链接地址(url) 字段支持 路由('/login')、全链接('http://xx', 'https://xx')

/**
 * @description: 检测是否登录
 * @param {*} redirect 重定向地址，默认重定向到 /check 路由页面，有登录回调 token 有值，没登录或失败 token 没值
 */
export function SSOCheck (redirect) {
  // 重定向地址
  var rUrl = SSORouter(redirect) || SSORouter('/check')
  // encode
  rUrl = encodeURIComponent(rUrl)
  // 全地址
  const url = `${SSO_URL}/frontend/v1/check?redirect=${rUrl}`
  // 替换
  window.location.replace(url)
}

/**
 * @description: 登录
 * @param {*} token 用户token
 * @param {*} redirect 重定向地址，默认重定向到 /check 路由页面，登录成功回调 token 有值，失败 token 没值
 * @return {*}
 */
export function SSOLogin (token, redirect) {
  // 重定向地址
  var rUrl = SSORouter(redirect) || SSORouter('/check')
  // encode
  rUrl = encodeURIComponent(rUrl)
  // 全地址
  const url = `${SSO_URL}/frontend/v1/login?redirect=${rUrl}&token=${token}`
  // 替换
  window.location.replace(url)
}

/**
 * @description: 退出登录
 * @param {*} token 用户token
 * @param {*} redirect 重定向地址，默认重定向到 /check 路由页面
 * @return {*}
 */
export function SSOLogout (token, redirect) {
  // 重定向地址
  var rUrl = SSORouter(redirect) || SSORouter('/check')
  // encode
  rUrl = encodeURIComponent(rUrl)
  // 全地址
  const url = `${SSO_URL}/frontend/v1/logout?redirect=${rUrl}&token=${token}`
  // 替换
  window.location.replace(url)
}

/**
 * @description: 传入重定向路由地址，进行处理返回可使用的重定向路由地址
 * @param {*} url 需要处理的重定向路由地址
 * @return {*}
 */
export function SSORouter (url) {
  // 是否有值
  if (url) {
    // 是否为 http 地址
    if (url.includes('http')) {
      // 直接返回使用
      return url
    } else {
      // 当前域名 + 路由地址
      return `${SSO_URL_REDIRECT}${url}`
    }
  }
  // 返回空
  return ''
}

/**
 * @description: 保存页面 URL 地址
 * @param {*} url 指定保存页面地址，可以传空字符串，默认保存当前页面 URL
 * @param {*} filters 是否需要过滤一些指定路由不会进行保存操作
 * @return {*}
 */
export function SSOSaveRoute (url, filters = []) {
  // 默认获取当前页面 URL
  var route = null
  // 判断 url 是否有值，空字符串也可以
  if (url || url === '') {
    // 记录 url
    route = url
  } else {
    // 记录当前页面 url
    route = window.location.href
  }
  // 检查当前 url 是否属于过滤 url 范围，不属于则保存
  if (!filters.some(item => { return route.includes(item) })) {
    // 保存指定页面地址
    localStorage.setItem('SSORoute', SSORouter(route))
  }
}

/**
 * @description: 获取上次保存的 URL 地址
 * @param {*} isClear 获取之后是否清空，默认 false
 * @return {*} 没有则是空字符串
 */
export function SSOGetRoute (isClear) {
  // 获取保存的 URL 地址
  var route = localStorage.getItem('SSORoute')
  // 是否清空
  if (isClear) { SSOClearRoute() }
  // 返回
  return route || ''
}

/**
 * @description: 清空上次保存的 URL 地址
 */
 export function SSOClearRoute () {
  // 保存指定页面地址
  localStorage.setItem('SSORoute', '')
}

/**
 * @description: 跳转到保存 URL（replace 跳转）
 * @param {*} url 如果本地没有存储路由，默认跳转该路由地址
 */
export function SSOGoToSaveRoute (url, isClear = true) {
  // 获取 URL 地址
  const route = SSOGetRoute(isClear) || SSORouter(url)
  // 是否有值
  if (route) { window.location.replace(route) }
}

/**
 * @description: 是否需要清理本地用户信息（在指定的路由名称中，不存在指定的附带参数，则需要清空本地用户信息）
 * @param {*} to to 路由对象 (router.beforeEach((to, from, next) => {}))
 * @param {*} name 路由名称 (to.name)
 * @param {*} field 路由附带参数字段 (query[field])
 * @return {*} 是否可以清理用户信息
 */
export function SSOIsClearLocalToken (to, name = 'check', field = 'token') {
  // 指定的路由 && 指定的参数不存在
  return to.name === name && !to.query[field]
}

/**
 * @description: 当前窗口是新窗口还是旧窗口
 * @param {*} isStorage 是否从 sessionStorage 中获取状态。（区别：true: 无论怎么刷新当前窗口状态都不会丢失，false: 只要有刷新或重载页面都会算是新窗口）
 * @param {*} second 有效时间，多少秒没有调用该方法，则需要重置为新窗口，0 为能多久就多久
 * @return {*} true: 新窗口 false: 旧窗口
 */
// isStorage 为 false 时使用的临时变量
var isNewWindow = true
// 使用方法
export function SSOIsNewWindow (isStorage = false, second = 0) {
  // 当前窗口状态
  var isNew = isNewWindow
  // 是否从 sessionStorage 中获取状态
  if (isStorage) {
    // 获取缓存状态
    isNew = sessionStorage.getItem('SSOIsNewWindow')
    // 转换状态
    isNew = (isNew ? Boolean(Number(isNew)) : true)
  }
  // 设置为旧窗口
  isNewWindow = false
  // 设置为旧窗口
  sessionStorage.setItem('SSOIsNewWindow', 0)
  // 调用有效期定时器
  SSOIsNewWindowTimer(second)
  // 返回状态
  return isNew
}

/**
 * @description: 当前窗口是新窗口还是旧窗口
 * @param {*} isStorage 是否从 sessionStorage 中获取状态。（区别：true: 无论怎么刷新当前窗口状态都不会丢失，false: 只要有刷新或重载页面都会算是新窗口）
 * @param {*} second (秒)有效时间，多少秒没有调用该方法，则需要重置为新窗口，0 为能多久就多久
 * @param {*} risecond (毫秒)间隔时间，调用该方法后在指定的间隔时间内都返回 false，只能等上次一次的设定的时间到期才可以重新设置间隔时间，在已间隔时间中途传入都不生效。
 * @return {*} true: 新窗口 false: 旧窗口
 */
export function SSOIsNewWindowPro (isStorage = false, second = 0, risecond = 0) {
  // 获取当前时间戳
  const currentTime = parseInt((new Date()).valueOf())
  // 取出最后一次时间戳
  const lastTime = Number(sessionStorage.getItem('SSORefreshIntervalTime') || 0)
  // 时间戳进行比较
  if (currentTime > lastTime) {
    // 如果过期则更新
    sessionStorage.setItem('SSORefreshIntervalTime', currentTime + risecond)
    // 返回正确的窗口状态
    return SSOIsNewWindow(isStorage, second)
  } else {
    // 如果是新窗口，设置为旧窗口
    if (isNewWindow) {
      // 修改全局状态
      isNewWindow = false
      // 修改缓存状态
      sessionStorage.setItem('SSOIsNewWindow', 0)
      // 调用有效期定时器
      SSOIsNewWindowTimer(second)
    }
    // 在有效期内返回 false 非新窗口
    return false
  }
}

/**
 * @description: 新窗口状态有效期定时器
 * @param {*} isStorage 获取状态环境
 * @param {*} second 有效时间，多少秒没有调用该方法，则需要重置为新窗口
 * @return {*}
 */
// 倒计时定时器
var timer = null
// 倒计时剩余秒数，0
var timerSecond = 0
// 使用方法
function SSOIsNewWindowTimer (second = 0) {
  // 没有定时器 && 秒数为 0，则不需要继续走下去
  if (!timer && second === 0) { return }
  // 记录时间
  timerSecond = second
  // 判断时间
  if (second === 0) {
    // 关闭定时器
    SSOIsNewWindowCloseTimer()
    // 重置为 0
    timerSecond = 0
  } else {
    // 关闭定时器
    SSOIsNewWindowCloseTimer()
    // 开启定时器
    timer = setInterval(() => {
      // 减少秒数
      timerSecond = timerSecond - 1
      // 倒计时结束
      if (timerSecond === 0) {
        // 关闭定时器
        SSOIsNewWindowCloseTimer()
        // 设置为新窗口
        sessionStorage.setItem('SSOIsNewWindow', 1)
        // 设置为新窗口
        isNewWindow = true
        // 重置为 0
        timerSecond = 0
      }
    }, 1000)
  }
}
/**
 * @description: 关闭有效期定时器
 */
function SSOIsNewWindowCloseTimer () {
  // 有定时器
  if (timer) {
    // 移除定时器
    clearInterval(timer)
    // 清空定时器
    timer = null
  }
}
