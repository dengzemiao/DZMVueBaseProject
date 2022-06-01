import axios from 'axios'
import VueAxios from 'vue-axios'
import Pub from '@/utils/public'

// 创建 axios 实例
const service = axios.create({
  // api
  baseURL: '',
  // 请求超时时间
  timeout: 90000
})

// 将 post 请求的 data 数据转换成 formdata 格式（请求数据设置为 params 不会被转换）
// FormData：https://blog.csdn.net/zz00008888/article/details/113933885
// service.defaults.transformRequest = data => {
//   return Pub.FORM_DATA(data)
// }

// 添加请求拦截器
service.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // 设置 Token 数据
  const token = Pub.ACCESS_TOKEN()
  if (token) { config.headers['X-Token'] = token }
  return config
})

// 添加响应拦截器
service.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response.data
})

// 全局导入
const install = {
  install(Vue) {
    Vue.use(VueAxios, service)
  }
};

// 导出
export {
  // 用于 main.js 全局导入
  install as VueAxios,
  // 用于页面请求
  service as axios
}
