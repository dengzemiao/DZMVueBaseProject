import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 全局样式
import '@/assets/css/common.css'

// 权限守卫
import '@/utils/permission'

// iconfont
import '@/assets/iconfont/iconfont.css'

// Antd
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount('#app')
