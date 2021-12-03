// GitHub：https://github.com/dengzemiao/DZMWebSSO，有服务器对接文件。

// 当前域名（当前项目的完整域名）
var SSO_URL_REDIRECT = `${window.location.protocol}//${window.location.host}`
// 是否为测试环境（根据项目填写正式域名地址进行判断）
var SSO_IS_DEBUG = !(window.location.host === 'hepai.video')
// 单点登录服务器地址（Server 文件夹中 index.html 所存放的服务器地址)
// index.html 放在了该域名的根目录(http://sso.dengzemiao.cn === http://sso.dengzemiao.cn/index.html)
var SSO_URL = SSO_IS_DEBUG ? 'http://sso.dengzemiao.cn' : 'http://sso.dengzemiao.cn'

// 公用对象
var SSO = {
  // 登录
  login (token, callback) {
    // 连接
    this.connect(callback, 'login', token)
  },
  // 退出
  logout (callback) {
    // 连接
    this.connect(callback, 'logout')
  },
  // 检查
  check (callback) {
    // 连接
    this.connect(callback, 'check')
  },
  // 生成路由全链接，url 支持路由('/login')、全链接('http://xx', 'https://xx')
  router (url) {
    // 是否有值
    if (url) {
      // 是否为 http 地址
      if (url.includes('http')) {
        // 直接返回使用
        return url
      } else {
        // 当前域名 + 路由地址
        return `${SSO_URL_REDIRECT}${url}`
      }
    }
    // 返回空
    return ''
  },
  // 连接
  connect (callback, type, token) {
    // 创建 iframe
    var iframe = document.createElement('iframe')
    // 设置载入页面
    iframe.src = `${SSO_URL}?type=${type}&token=${token}`
    // 加入当前页面
    document.body.appendChild(iframe)
    // 添加样式
    iframe.style.opacity = 0
    // 用于页面调试使用，如需调试，打开下面 style，注释上面 style
    // iframe.style.position = 'fixed'
    // iframe.style.left = '0px'
    // iframe.style.top = '0px'
    // iframe.style.top = '0px'
    // iframe.style.width = '100%'
    // iframe.style.height = '100%'
    // iframe.style.border = 'none'
    // iframe.style.backgroundColor = 'red'
    // 添加消息监听
    window.addEventListener('message', receiveMessage)
    // 接收消息
    function receiveMessage (msg) {
      // 获取数据
      const data = msg.data
      // 是否为 SSO
      if (data.sso) {
        // 返回数据
        if (callback) { callback(msg.data) }
        // 移除 iframe
        document.body.removeChild(iframe)
        // 移除消息监听
        window.removeEventListener('message', receiveMessage, false)
      }
    }
  }
}

// 导出
export default SSO
