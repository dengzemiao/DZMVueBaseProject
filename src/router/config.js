// 导入自定义 Layout 布局
import { BaseLayout, RouterView } from '@/layouts'

// 页面路由列表
export const routes = [
  {
    path: '/',
    name: 'Home0',
    component: () => import('@/views/Home')
  },
  {
    path: '/layout',
    redirect: '/home',
    component: BaseLayout,
    meta: { title: '首页', keepAlive: false },
    // hidden: true
    children: [
      {
        path: '/home',
        name: 'Home1',
        component: () => import('@/views/Home'),
        meta: { title: '首页1', keepAlive: false, icon: 'HomeOutlined' }
        // hidden: true
      },
      {
        path: '/home2',
        name: 'Home2',
        component: () => import('@/views/Home'),
        meta: { title: '首页2', keepAlive: false, icon: 'menu_0_nomal.png', sicon: 'menu_0_select.png', type: 2 }
      },
      {
        path: '/home3',
        redirect: '/home4',
        component: RouterView,
        meta: { title: '首页3', keepAlive: false, icon: 'menu_0_nomal.png', sicon: 'menu_0_select.png', type: 2 },
        children: [
          {
            path: '/home4',
            name: 'Home4',
            component: () => import('@/views/Home'),
            meta: { title: '首页4', keepAlive: false, icon: 'HomeOutlined' }
          },
          {
            path: '/home5',
            name: 'Home5',
            component: () => import('@/views/Home'),
            meta: { title: '首页5', keepAlive: false, icon: 'menu_0_nomal.png', sicon: 'menu_0_select.png', type: 2 }
          }
        ]
      }
    ]
  }
]