import { axios } from '@/api/axios'

// 服务器代理地址
const BASE_URL = process.env.VUE_APP_API_BASE_URL

// ================================= 《 公 共 》

// 获取七牛token
export function getQiNiuToken(parameter) {
  return axios({
    url: BASE_URL + '/qiniu/get_token',
    method: 'get',
    params: parameter
  })
}
