import router from '@/router'
import Vue from 'vue'

const Pub = {

  // ================================= 《 路 由 跳 转 》

  // 新窗口访问链接
  OPEN_URL (url) {
    window.open(url, '_blank')
  },

  // 新窗口访问路由地址
  OPEN_ROUTER (path, query) {
    const routeData = router.resolve({
      path: path,
      query: query
    })
    window.open(routeData.href, '_blank')
  },

  // 跳转到指定路由地址
  JUMP_ROUTER (path, query) {
    router.push({
      path: path,
      query: query
    })
  },

  // ================================= 《 正 则 效 验 》

  // 正则匹配是否存在
  REG_TEST (reg, value) {
    var re = new RegExp(reg)
    if (re.test(value)) {
      return true
    } else {
      return false
    }
  },

  // 删除字符串全部空格
  STRING_SPACE_ALL (str) {
    return str.replace(/\s/g, '')
  },

  // 删除字符串左右空格
  STRING_SPACE_LR (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  },

  // 删除字符串左边空格
  STRING_SPACE_L (str) {
    return str.replace(/(^\s*)/g, '')
  },

  // 删除字符串右边空格
  STRING_SPACE_R (str) {
    return str.replace(/(\s*$)/g, '')
  },

  // 判断是否为正数（允许小数点，不能为负数）
  REG_IS_NUMBER (value) {
    return (this.REG_TEST(/^\d+(\.\d+)?$/, value))
  },

  // 判断是否为正整数
  REG_IS_INTEGER (value) {
    return (this.REG_TEST(/^\d+$/, value))
  },

  // 判断是否为手机号
  REG_IS_PHONE (value) {
    return (this.REG_TEST(/^1[3456789]\d{9}$/, value))
  },

  // 判断是否为邮箱
  REG_IS_EMAIL (value) {
    return (this.REG_TEST(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, value))
  },

  // ================================= 《 文 件 路 径 处 理 》

  // 是否为图片
  FILE_IS_IMAGE (filePath) {
    // 后缀列表（如果缺少自行补充）
    const types = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff']
    // 文件后缀
    const type = this.FILE_EXTENSION(filePath)
    // 是否包含
    return types.indexOf(type) !== -1
  },

  // 是否为视频
  FILE_IS_VIDEO (filePath) {
    // 后缀列表（如果缺少自行补充）
    const types = ['mp4', 'mp3', 'avi', 'wmv', 'mpg', 'mpeg', 'mov', 'rm', 'ram', 'swf', 'flv', 'wma', 'avi', 'rmvb', 'mkv']
    // 文件后缀
    const type = this.FILE_EXTENSION(filePath)
    // 是否包含
    return types.indexOf(type) !== -1
  },

  // 获取路径后缀（不带 '.'）
  FILE_EXTENSION (filePath, toLowerCase = true) {
    // 获取路径中最后一个 '.' 位置
    var index = filePath.lastIndexOf('.')
    // 截取尾部后缀
    var type = filePath.substr(index + 1)
    // 是否转为小写
    if (toLowerCase) {
      // 转为小写返回
      return type.toLowerCase()
    } else {
      // 不做处理返回
      return type
    }
  },

  // ================================= 《 针 对 项 目 自 定 义 》

  // (获取 || 设置) token
  ACCESS_TOKEN (token) {
    if (token === undefined) {
      return Vue.ls.get('token')
    } else {
      return Vue.ls.set('token', token)
    }
  },

  // Vue.ls 配置
  VUE_LS_OPTIONS () {
    return {
      namespace: 'vue_', // 存储 key 前缀
      name: 'ls', // 属性命名（ Vue.ls 或 this.$ls ）
      storage: 'local', // 存储位置: session, local, memory
    }
  }
}

// 导出
export default Pub