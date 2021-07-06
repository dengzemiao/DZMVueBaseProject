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
  FILE_IS_IMAGE (filePath, isFuzzy = true) {
    // 后缀列表（如果缺少自行补充）
    const types = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff']
    // 返回匹配结果
    return this.FILE_IS_TYPE(filePath, types, isFuzzy)
  },

  // 是否为视频
  FILE_IS_VIDEO (filePath, isFuzzy = true) {
    // 后缀列表（如果缺少自行补充）
    const types = ['mp4', 'mp3', 'avi', 'wmv', 'mpg', 'mpeg', 'mov', 'rm', 'ram', 'swf', 'flv', 'wma', 'avi', 'rmvb', 'mkv']
    // 返回匹配结果
    return this.FILE_IS_TYPE(filePath, types, isFuzzy)
  },

  // 检查文件后缀是否为存在指定格式列表中（isFuzzy：如果正常匹配失败，是否允许使用模糊匹配二次匹配）
  FILE_IS_TYPE (filePath, types, isFuzzy = true) {
    // 匹配结果
    var isResult = false
    // 路径有值 && 格式列表有值
    if (filePath && filePath.length && types.length) {
      // 文件后缀
      const type = this.FILE_EXTENSION(filePath)
      // 精确匹配
      isResult = types.indexOf(type.toLowerCase()) !== -1
      // 匹配失败 && 允许模糊匹配
      if (!isResult && isFuzzy) {
        // 匹配是否存在
        types.some(item => {
          // 匹配规则
          var reg = new RegExp(`\\.${item}\\?`, 'i')
          // 匹配结果
          var results = filePath.match(reg) || []
          // 取得结果
          isResult = Boolean(results.length)
          // 返回
          return isResult
        })
      }
    }
    // 返回
    return isResult
  },

  // 获取路径后缀（不带 '.'）
  FILE_EXTENSION (filePath) {
    // 后缀类型
    var type = ''
    // 路径有值
    if (filePath && filePath.length) {
      // 获取路径中最后一个 '.' 位置
      var index = filePath.lastIndexOf('.')
      // 截取尾部后缀
      type = filePath.substr(index + 1)
    }
    // 返回
    return type
  },

  // ================================= 《 针 对 项 目 自 定 义 》

  // 项目运行环境
  IS_DEBUG () {
    // 判断是否为正式域名地址
    if (window.location.host === 'task.hepai.video') {
      // 线上环境
      return false
    } else {
      // 调试环境
      return true
    }
  },

  // Vue.ls 配置
  VUE_LS_OPTIONS () {
    return {
      namespace: 'vue_', // 存储 key 前缀
      name: 'ls', // 属性命名（ Vue.ls 或 this.$ls ）
      storage: 'local', // 存储位置: session, local, memory
    }
  },

  // (获取 || 设置) token
  ACCESS_TOKEN (token) {
    if (token === undefined) {
      return Vue.ls.get('token')
    } else {
      return Vue.ls.set('token', token)
    }
  }
}

// 导出
export default Pub