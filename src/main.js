// 初始化相关
import { createApp } from 'vue'
import { nextTick } from "@vue/runtime-core"
import App from './App.vue'
import router from './router'
import store from './store'

// 路由守卫
import '@/utils/permission'

// global less
import '@/assets/css/common.css'

// 公用属性对象
import Pub from '@/utils/public'

// 日期工具
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

// 创建对象
const app = createApp(App)
// 使用并挂载
app
.use(store)
.use(router)
.mount('#app')

// 必须使用 nextTick，不然会有加载顺序问题，导致绑定失败
nextTick(() => {
  app.config.globalProperties.$pub = Pub
  app.config.globalProperties.$moment = moment
})

// 导出
// export default app
