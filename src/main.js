// 初始化相关
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入工具类（所有的第三方库导入存放）
import '@/utils/use'

// 创建对象
const app = createApp(App)
// 使用并挂载
app.use(store).use(router).mount('#app')
// 导出
export default app
