import Vue from 'vue'

// global less
import '@/assets/css/common.css'

// 公用属性对象
import Pub from '@/utils/public'

// axios
import { VueAxios } from '@/api/axios'

// mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

// Vue 存储管理插件
import VueLs from 'vue-ls'

// 日期工具
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

// 配置到 Vue
Vue.use(VueAxios)
Vue.use(MintUI)
Vue.use(VueLs, Pub.VUE_LS_OPTIONS)
Vue.prototype.$pub = Pub
Vue.prototype.$moment = moment

