import Vue from 'vue'

// global less
import '@/assets/css/common.css'

// 公用属性对象
import Pub from '@/utils/public'

// axios
import { VueAxios } from '@/api/axios'

// antd
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// Vue 存储管理插件
import VueLs from 'vue-ls'

// 配置到 Vue
Vue.use(VueAxios)
Vue.use(Antd)
Vue.use(VueLs, Pub.VUE_LS_OPTIONS)
Vue.prototype.$pub = Pub
