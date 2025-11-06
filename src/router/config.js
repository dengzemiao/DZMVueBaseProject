// 导入自定义 Layout 布局
import { BaseLayout, RouterView } from '@/layouts'

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
    redirect: '/home2',
    children: [
      {
        path: '/home2',
        name: 'Home2',
        component: () => import('@/views/Home.vue'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/home3',
        name: 'Home3',
        component: () => RouterView,
        meta: { title: 'Home3', keepAlive: false },
        children: [
          {
            path: '/home4',
            name: 'Home4',
            component: () => import('@/views/Home.vue'),
            meta: { title: 'Home4', keepAlive: false }
          }
        ]
      }
    ]
  }
]