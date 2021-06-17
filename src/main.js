// 初始化相关
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入工具类（所有的第三方库导入存放）
import '@/utils/use'

// 阻止正式环境消息提示
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
