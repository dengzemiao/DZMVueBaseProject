import axios from 'axios'
import Pub from '@/utils/public'

// 创建 axios 实例
const service = axios.create({
  // api - 从环境变量配置获取
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // 请求超时时间（单位：毫秒，默认30秒）
  timeout: 30000
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
  const token = Pub.accessToken()
  if (token) { config.headers['X-Token'] = token }
  return config
})

// 添加响应拦截器
service.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response.data
})

// 导出
export default service
