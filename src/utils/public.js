import router from '@/router'

const Pub = {

  // ================================= 《 路由跳转 》

  // 新窗口访问链接
  openUrl(url) {
    window.open(url, '_blank')
  },

  // 跳转到指定地址
  jumpUrl(url) {
    window.location = url
  },

  // 新窗口访问路由地址
  openRouter(path, query) {
    const routeData = router.resolve({
      path: path,
      query: query
    })
    window.open(routeData.href, '_blank')
  },

  // 跳转到指定路由地址
  jumpRouter(path, query) {
    router.push({
      path: path,
      query: query
    })
  },

  // 当前域名
  domainName(path) {
    return window.location.protocol + '//' + window.location.host + (path || '')
  },

  // ================================= 《 小数点处理 》

  // 检查指定数字小数点是否超过指定个数
  // 返回 true: 超过, false: 没超过
  checkNumberDecimal(value, maxLength) {
    const str = String(value || '')
    const dotIndex = str.indexOf('.')
    if (dotIndex === -1) return false
    const decimalLength = str.length - dotIndex - 1
    return decimalLength > maxLength
  },

  // 保留小数点位数
  // value: 数值或字符串
  // decimal: 保留的小数点位数
  // fillZero: 是否在小数点不够时补0，默认 true
  keepNumberDecimal(value, decimal, fillZero = true) {
    const str = String(value || '0')
    const num = Number(value)
    if (isNaN(num)) return str
    
    const decimalPlaces = Math.max(0, Math.floor(decimal))
    
    // 如果不需要小数位
    if (decimalPlaces === 0) {
      return str.split('.')[0]
    }
    
    // 分割整数和小数部分
    const parts = str.split('.')
    const integerPart = parts[0] || '0'
    let decimalPart = parts[1] || ''
    
    // 截断小数部分（超过位数时截断，不四舍五入）
    if (decimalPart.length > decimalPlaces) {
      decimalPart = decimalPart.substring(0, decimalPlaces)
    }
    
    // 补0
    if (fillZero && decimalPart.length < decimalPlaces) {
      decimalPart += '0'.repeat(decimalPlaces - decimalPart.length)
    }
    
    // 组合结果
    return decimalPart ? `${integerPart}.${decimalPart}` : integerPart
  },

  // ================================= 《 正则校验 》

  // 公共正则函数 - 正则匹配是否存在
  regTest(reg, value) {
    const regex = new RegExp(reg)
    return regex.test(value)
  },

  // 判断是否为手机号
  isPhone(value) {
    return this.regTest(/^1[3-9]\d{9}$/, value)
  },

  // 判断是否为邮箱
  isEmail(value) {
    return this.regTest(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, value)
  },

  // 判断是否为正整数（不包括0）
  isPositiveInteger(value) {
    return this.regTest(/^[1-9]\d*$/, value)
  },

  // 判断是否为正整数（包括0）
  isInteger(value) {
    return this.regTest(/^\d+$/, value)
  },

  // 判断是否为正数（包括0，允许小数点，不能为负数）
  isPositiveNumber(value) {
    return this.regTest(/^\d+(\.\d+)?$/, value)
  },

  // 判断是否为正数（包括0，允许小数点，小数位置可以传入指定限制，不能为负数）
  isPositiveNumberDecimal(value, decimal) {
    if (decimal === undefined || decimal === null) {
      return this.isPositiveNumber(value)
    }
    const decimalPlaces = Math.max(0, Math.floor(decimal))
    if (decimalPlaces === 0) {
      return this.isInteger(value)
    }
    const regex = new RegExp(`^\\d+(\\.\\d{1,${decimalPlaces}})?$`)
    return this.regTest(regex, value)
  },

  // 删除全部空格
  removeAllSpaces(str) {
    return String(str || '').replace(/\s/g, '')
  },

  // 删除全部空格回车
  removeAllSpacesAndNewlines(str) {
    return String(str || '').replace(/[\s\n\r\t]/g, '')
  },

  // ================================= 《 针对项目自定义 》

  // 项目运行环境
  isDebug() {
    // 当前 host
    const host = window.location.host
    // 不等于正式域名，为测试环境
    if (host !== 'task.hepai.video') {
      // 调试环境
      return true
    } else {
      // 线上环境
      return false
    }
  },

  // (获取 || 设置) token
  accessToken(value) {
    return this.storage('token', value)
  },

  // (获取 || 设置) userinfo
  userInfo(value) {
    return this.storage('userinfo', value)
  },

  // (获取 || 设置) 自定义字段
  storage(key, value) {
    if (value === undefined) {
      return localStorage.getItem(key)
    } else {
      return localStorage.setItem(key, value)
    }
  },
}

export default Pub