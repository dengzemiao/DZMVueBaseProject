// 导入自定义 Layout 布局
import { BaseLayout, RouterView } from '@/layouts'
// 如需使用 Ant Design Vue 图标，请先安装: npm install @ant-design/icons-vue
import { HomeOutlined, MenuOutlined } from '@ant-design/icons-vue'

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
        // icon 配置参数说明文件：/src/layouts/components/Menu.vue
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/local-icon',
        name: 'LocalIcon',
        component: () => import('@/views/Home.vue'),
        // icon 配置参数说明文件：/src/layouts/components/Menu.vue
        meta: { title: '本地图标', keepAlive: false, icon: 'menu_0_nomal.png', sicon: 'menu_0_select.png' }
      },
      {
        path: '/antd-icon',
        name: 'AntdIcon',
        component: () => import('@/views/Home.vue'),
        // icon 配置参数说明文件：/src/layouts/components/Menu.vue
        meta: { title: 'Antdv 图标', keepAlive: false, icon: HomeOutlined, sicon: MenuOutlined }
      },
      {
        path: '/network-icon',
        name: 'NetworkIcon',
        component: () => import('@/views/Home.vue'),
        // icon 配置参数说明文件：/src/layouts/components/Menu.vue
        meta: { title: '网络图标', keepAlive: false, icon: 'https://q1.itc.cn/q_70/images03/20241119/197701bb9ef34b20b6497720081a9972.jpeg', sicon: MenuOutlined }
      },
      {
        path: '/iconfont-icon',
        name: 'IconfontIcon',
        component: () => import('@/views/Home.vue'),
        // icon 配置参数说明文件：/src/layouts/components/Menu.vue
        meta: { title: 'Iconfont 图标', keepAlive: false, icon: 'icon-chengyuan', sicon: 'icon-zhuxi' }
      },
      {
        path: '/home3',
        name: 'Home3',
        component: () => RouterView,
        meta: { title: 'Home3', keepAlive: false, icon: HomeOutlined },
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