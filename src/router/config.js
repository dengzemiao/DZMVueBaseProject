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
        // 示例：本地图片（自动识别，有文件后缀）
        // 图片需放在 src/assets/img/ 目录下，支持 png/jpg/jpeg/gif/svg/webp/bmp/ico 格式
        meta: { title: '本地图标', keepAlive: false, icon: 'menu_0_nomal.png', sicon: 'menu_0_select.png' }
      },
      {
        path: '/antd-icon',
        name: 'AntdIcon',
        component: () => import('@/views/Home.vue'),
        // 示例：Ant Design Vue 组件（自动识别）
        // 需要先导入图标组件：import { HomeOutlined, MenuOutlined } from '@ant-design/icons-vue'
        meta: { title: 'Antdv 图标', keepAlive: false, icon: HomeOutlined, sicon: MenuOutlined }
      },
      {
        path: '/network-icon',
        name: 'NetworkIcon',
        component: () => import('@/views/Home.vue'),
        // 示例：网络图片（自动识别，以 http:// 或 https:// 开头，最高优先级）
        meta: { title: '网络图标', keepAlive: false, icon: 'https://q1.itc.cn/q_70/images03/20241119/197701bb9ef34b20b6497720081a9972.jpeg', sicon: MenuOutlined }
      },
      {
        path: '/iconfont-icon',
        name: 'IconfontIcon',
        component: () => import('@/views/Home.vue'),
        // 示例：iconfont 图标（自动识别，字符串且无文件后缀）
        // 传入 iconfont 的 class 名称，需要确保已引入 iconfont 样式文件
        // 需要导入 iconfont 样式文件：import '@/assets/iconfont/iconfont.css'
        meta: { title: 'Iconfont 图标（暂无样式文件）', keepAlive: false, icon: 'icon-home', sicon: 'icon-home-active' }
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