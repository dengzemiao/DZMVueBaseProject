// 导入自定义 Layout 布局
import { BaseLayout, RouterView } from '@/layouts'
// 如需使用 Ant Design Vue 图标，请先安装: npm install @ant-design/icons-vue
import { HomeOutlined, MenuOutlined } from '@ant-design/icons-vue'

/**
 * 路由配置说明
 * 
 * meta.title: 页面标题（必需）
 *   - 用于菜单显示和页面标题
 *   示例: meta: { title: '首页' }
 * 
 * meta.needAuth: 是否需要登录验证
 *   - true: 需要登录验证（默认值）
 *   - false: 不需要登录验证
 *   示例: meta: { title: '页面标题', needAuth: false }
 *   注意：白名单中的路由（/login, /check）始终不需要验证
 * 
 * meta.icon: 默认图标（可选）
 * meta.sicon: 选中/Hover状态时的图标（可选）
 *   - 系统会自动识别图标类型，支持：网络图片、Ant Design Vue 组件、本地图片、iconfont
 *   - 识别优先级：网络图片 > Ant Design Vue 组件 > 本地图片 > iconfont
 *   - 详细说明和使用示例请查看：/src/layouts/components/Menu.vue（第 58-115 行）
 *   示例: meta: { title: '首页', icon: HomeOutlined, sicon: MenuOutlined }
 */

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
        meta: { title: '首页' }
      },
      {
        path: '/local-icon',
        name: 'LocalIcon',
        component: () => import('@/views/Home.vue'),
        meta: { title: '本地图标', icon: 'menu_0_nomal.png', sicon: 'menu_0_select.png' }
      },
      {
        path: '/antd-icon',
        name: 'AntdIcon',
        component: () => import('@/views/Home.vue'),
        meta: { title: 'Antdv 图标', icon: HomeOutlined, sicon: MenuOutlined }
      },
      {
        path: '/network-icon',
        name: 'NetworkIcon',
        component: () => import('@/views/Home.vue'),
        meta: { title: '网络图标', icon: 'https://q1.itc.cn/q_70/images03/20241119/197701bb9ef34b20b6497720081a9972.jpeg', sicon: MenuOutlined }
      },
      {
        path: '/iconfont-icon',
        name: 'IconfontIcon',
        component: () => import('@/views/Home.vue'),
        meta: { title: 'Iconfont 图标', icon: 'icon-chengyuan', sicon: 'icon-zhuxi' }
      },
      {
        path: '/home3',
        name: 'Home3',
        component: () => RouterView,
        meta: { title: 'Home3', icon: HomeOutlined },
        children: [
          {
            path: '/home4',
            name: 'Home4',
            component: () => import('@/views/Home.vue'),
            meta: { title: 'Home4' }
          }
        ]
      }
    ]
  }
]