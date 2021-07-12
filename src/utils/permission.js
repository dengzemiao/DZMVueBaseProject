import router from '@/router'
import Pub from '@/utils/public'

// 白名单
const whiteList = ['/login', '/check']

// 路由守卫
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