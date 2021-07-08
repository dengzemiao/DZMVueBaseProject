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

// 日期工具
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

// 配置到 Vue
Vue.use(VueAxios)
Vue.use(Antd)
Vue.prototype.$pub = Pub
Vue.prototype.$moment = moment

