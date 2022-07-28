module.exports = {
  devServer: {
    // 端口号
    port: 8080,
    // 配置不同的后台 API 地址
    proxy: {
      '/api': {
        target: 'http://www.dzm.com',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
