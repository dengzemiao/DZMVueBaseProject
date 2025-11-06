import router from '@/router'
// import Pub from '@/utils/public'

// ================================= 《 路由权限配置 》

// 白名单 - 不需要登录即可访问的路由
const whiteList = ['/login', '/check']

// 登录页面路径
const LOGIN_PATH = '/login'

// ================================= 《 路由守卫 》

// 判断路由是否需要登录验证
const needAuth = (to) => {
  // 白名单中的路由不需要验证
  if (whiteList.includes(to.path)) {
    return false
  }
  // 如果路由 meta 中明确指定了 needAuth，则使用该值
  if (to.meta?.needAuth !== undefined) {
    return to.meta.needAuth
  }
  // 默认需要登录验证
  return true
}

router.beforeEach((to, from, next) => {
  
  // 默认允许访问
  next()

  // 如需添加权限验证，可取消注释以下代码：
  // if (needAuth(to)) {
  //   // 需要登录验证
  //   const token = Pub.accessToken()
  //   if (token) {
  //     // 有 token，允许访问
  //     next()
  //   } else {
  //     // 没有 token，跳转到登录页
  //     next({ path: LOGIN_PATH, query: { redirect: to.fullPath } })
  //   }
  // } else {
  //   // 不需要登录验证，允许访问
  //   next()
  // }
})

// ================================= 《 路由后置守卫 》

// 路由后置守卫 - 设置页面标题
router.afterEach((to) => {
  // 设置页面标题
  if (to.meta?.title) {
    document.title = `${to.meta.title} - Base Project`
  } else {
    document.title = 'Base Project'
  }
})