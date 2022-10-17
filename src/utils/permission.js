import router from '@/router'
import Pub from '@/utils/public'
const version = require('@/utils/version')

// 白名单
const whiteList = ['/login', '/check']

// 路由跳转前执行
router.beforeEach((to, from, next) => {

  // 默认
  next()

  // 路由限制 - 打开注释使用
  // // 检查是否有 Token
  // if (Pub.ACCESS_TOKEN()) {
  //   // 继续下一步
  //   next()
  // } else {
  //   // 没有 Token，检查白名单
  //   if (whiteList.includes(to.path)) {
  //     // 属于白名单则继续下一步
  //     next()
  //   } else {
  //     // 不属于白名单则进入登录页面（redirect 值可作为登录成功后跳转的地址，帮助用户进入指定页面）
  //     next({
  //       path: '/login',
  //       query: { redirect: to.fullPath }
  //     })
  //   }
  // }
  
})

// 路由跳转后执行
router.afterEach((to, from) => {
  // 如果不想每个路由都检查是否有新版本，只需要在特定的页面才需要检查版本，可以在这里做白名单判断
  // 兼容版本，如果是新版本则进行刷新并缓存
  version.getPro()
})