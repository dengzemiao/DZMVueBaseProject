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
        meta: { title: '首页1', keepAlive: false, icon: 'home' }
      },
      {
        path: '/home2',
        name: 'Home',
        component: () => import('@/views/Home'),
        meta: { title: '首页2', keepAlive: false, icon: 'menu_0_nomal.png', sicon: 'menu_0_select.png', type: 2 }
      },
      {
        path: '/home3',
        name: 'Home',
        component: () => import('@/views/Home'),
        meta: { title: '首页3', keepAlive: false, icon: 'menu_0_nomal.png', sicon: 'menu_0_select.png', type: 2 },
        children: [
          {
            path: '/home4',
            name: 'Home',
            component: () => import('@/views/Home'),
            meta: { title: '首页4', keepAlive: false, icon: 'home' }
          },
          {
            path: '/home5',
            name: 'Home',
            component: () => import('@/views/Home'),
            meta: { title: '首页5', keepAlive: false, icon: 'menu_0_nomal.png', sicon: 'menu_0_select.png', type: 2 }
          }
        ]
      }
    ]
  }
]