import axios from '@/api/axios'

// ================================= 《 公 共 》

// 获取火山云 OSS Token
export function getHuoShanOssToken(parameter) {
  return axios({
    url: '/oss/get_huoshan_token',
    method: 'get',
    params: parameter
  })
}
