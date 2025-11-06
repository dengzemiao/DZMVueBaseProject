import axios from 'axios'
import { message } from 'ant-design-vue'
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
service.interceptors.request.use(
  // 请求成功处理
  config => {
    // 在发送请求之前做些什么
    // 设置 Token 数据
    const token = Pub.accessToken()
    if (token) {
      config.headers['X-Token'] = token
    }
    // 返回配置
    return config
  },
  // 请求错误处理
  error => {
    // 请求错误处理
    console.error('请求错误:', error)
    // 返回错误
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  // 响应成功处理
  response => {
    // 对响应数据做点什么
    const res = response.data
    
    // 如果响应数据中有 code 字段，可以根据业务需求处理
    // 例如：code === 200 表示成功，其他表示失败
    // if (res.code !== undefined && res.code !== 200) {
    //   message.error(res.message || '请求失败')
    //   return Promise.reject(new Error(res.message || '请求失败'))
    // }

    // 返回响应数据
    return res
  },
  // 响应错误处理
  error => {
    // 响应错误处理
    console.error('响应错误:', error)
    // 默认错误信息
    let errorMessage = '请求失败，请稍后重试'
    // 如果响应数据中有错误状态码，则根据错误状态码显示错误信息
    if (error.response) {
      // 服务器返回了错误状态码
      const { status, data } = error.response
      // 根据错误状态码显示错误信息
      switch (status) {
        case 400:
          errorMessage = data?.message || '请求参数错误'
          break
        case 401:
          errorMessage = '未授权，请重新登录'
          // 清除 token，跳转到登录页
          Pub.accessToken('')
          // 可以在这里跳转到登录页
          // Pub.jumpRouter('/login')
          break
        case 403:
          errorMessage = '拒绝访问'
          break
        case 404:
          errorMessage = '请求的资源不存在'
          break
        case 500:
          errorMessage = '服务器内部错误'
          break
        case 502:
          errorMessage = '网关错误'
          break
        case 503:
          errorMessage = '服务不可用'
          break
        case 504:
          errorMessage = '网关超时'
          break
        default:
          errorMessage = data?.message || `请求失败 (${status})`
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      errorMessage = '网络连接失败，请检查网络'
    } else if (error.code === 'ECONNABORTED') {
      // 请求超时
      errorMessage = '请求超时，请稍后重试'
    } else {
      // 其他错误
      errorMessage = error.message || '请求失败，请稍后重试'
    }
    // 显示错误提示
    message.error(errorMessage)
    // 返回错误
    return Promise.reject(error)
  }
)

// 导出
export default service
