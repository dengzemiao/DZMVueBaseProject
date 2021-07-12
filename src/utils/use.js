import Vue from 'vue'

// 路由守卫
import '@/utils/permission'

// global less
import '@/assets/css/common.css'

// 公用属性对象
import Pub from '@/utils/public'

// axios
import { VueAxios } from '@/api/axios'

// 日期工具
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

// 配置到 Vue
Vue.use(VueAxios)
Vue.prototype.$pub = Pub
Vue.prototype.$moment = moment

