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
      },
      // 附件
      '/ProxyVideo': {
        target: 'https://file.hepai.video',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/ProxyVideo': ''
        }
      },
      // 转码处理的原视频
      '/VideoDownload': {
        target: 'https://vprivate.hepai.video',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/VideoDownload': ''
        }
      },
      // 公有视频&转码后的视频
      '/VideoPublic': {
        target: 'https://vpublic.hepai.video',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/VideoPublic': ''
        }
      }
    }
  }
}
