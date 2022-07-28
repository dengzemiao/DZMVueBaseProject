// 引入对象
import app from '@/main'
import { nextTick } from "@vue/runtime-core"

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

// 必须使用 nextTick，不然会有加载顺序问题，导致绑定失败
nextTick(() => {
  app.config.globalProperties.$pub = Pub
  app.config.globalProperties.$moment = moment
})

