// 在 build 时，每次创建/更新版本文件
const verify = require('./src/utils/version')
verify.create()
// 其他配置
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
