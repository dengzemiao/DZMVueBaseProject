// 导入自定义 Layout 布局
import { BaseLayout } from '@/layouts'

// 页面路由列表
export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/layout',
    component: BaseLayout,
    meta: { title: '首页', keepAlive: false },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home'),
        meta: { title: '首页', keepAlive: false }
      }
    ]
  }
]