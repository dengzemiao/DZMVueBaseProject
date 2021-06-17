import Vue from 'vue'

// global less
import '@/assets/css/common.css'

// 公用属性对象
import Pub from '@/utils/public'

// Vue 存储管理插件
import VueLs from 'vue-ls'

// 配置到 Vue
Vue.use(VueLs, Pub.VUE_LS_OPTIONS)
Vue.prototype.$pub = Pub
