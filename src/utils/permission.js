import router from '@/router'
// import Pub from '@/utils/public'

// ================================= 《 路由权限配置 》

// // 白名单 - 不需要登录即可访问的路由
// const whiteList = ['/login', '/check']

// // 登录页面路径
// const LOGIN_PATH = '/login'

// // 判断路由是否在白名单中
// const isInWhiteList = (path) => {
//   return whiteList.some(route => path.startsWith(route))
// }

// // 判断是否需要登录验证（可通过路由 meta 配置）
// const needAuth = (to) => {
//   // 如果路由 meta 中明确指定了 needAuth，则使用该值
//   if (to.meta?.needAuth !== undefined) {
//     return to.meta.needAuth
//   }
//   // 默认需要登录验证（除了白名单）
//   return !isInWhiteList(to.path)
// }

// ================================= 《 路由守卫 》

router.beforeEach((to, from, next) => {

  // 打印路由信息
  console.log('路由守卫', to, from);
  // 默认允许访问
  next()

  // // 获取 token
  // const token = Pub.accessToken()
  // // 判断是否需要登录验证
  // if (needAuth(to)) {
  //   // 需要登录验证
  //   if (token) {
  //     // 有 token，允许访问
  //     next()
  //   } else {
  //     // 没有 token，跳转到登录页
  //     // redirect 参数用于登录成功后跳转回原页面
  //     next({
  //       path: LOGIN_PATH,
  //       query: { redirect: to.fullPath }
  //     })
  //   }
  // } else {
  //   // 不需要登录验证（白名单或已登录访问登录页）
  //   if (token && to.path === LOGIN_PATH) {
  //     // 已登录用户访问登录页，重定向到首页
  //     next({ path: '/' })
  //   } else {
  //     // 允许访问
  //     next()
  //   }
  // }
})

// ================================= 《 路由后置守卫（可选）》

// router.afterEach((to, from) => {
//   // 可以在这里设置页面标题等
//   if (to.meta?.title) {
//     document.title = to.meta.title
//   }
// })