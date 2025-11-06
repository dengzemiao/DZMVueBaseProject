// 导入自定义 Layout 布局
import { BaseLayout } from '@/layouts'

// 页面路由列表
export const routes = [
  {
    path: '/',
    name: 'Home1',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/layout',
    component: BaseLayout,
    meta: { title: '首页', keepAlive: false },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home2',
        component: () => import('@/views/Home.vue'),
        meta: { title: '首页', keepAlive: false }
      }
    ]
  }
]