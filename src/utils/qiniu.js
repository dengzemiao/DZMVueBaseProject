import * as qiniu from 'qiniu-js'
import { getQiNiuToken } from '@/api/request'

// ================================= 《 针 对 Upload 组 件 封 装，无 用 可 删 除 》

// 上传七牛针对 Upload 组件再次封装，方便重新上传操作，uploadType 默认 other
export function uploadQiNiu (fileJson, uploadResult, uploadType) {
  // 检查是否有文件
  if (fileJson.file) {
    // 设置为上传状态
    fileJson.status = 'uploading'
    // 清空上传进度
    fileJson.percent = 0
    // 回调对象
    const observer = {
      next (res) {
        // 输出进度
        // console.log('上传进度', res)
        // 记录进度
        fileJson.percent = res.total.percent
        // 回调结果
        if (uploadResult) { uploadResult(fileJson) }
      },
      error (err) {
        // 输出错误
        // console.log('上传失败', err)
        // 设置为失败状态
        fileJson.status = 'error'
        // 回调结果
        if (uploadResult) { uploadResult(fileJson, err) }
      },
      complete (res) {
        // 输出结果
        // console.log('上传成功', res)
        // 设置为成功状态
        fileJson.status = 'done'
        // 上传成功则清空 file 对象，因为只有失败才可能需要重新上传
        fileJson.file = undefined
        // 回调结果
        if (uploadResult) { uploadResult(fileJson, res) }
      }
    }
    // 开始上传回调
    if (uploadResult) { uploadResult(fileJson) }
    // 按照视频上传类型，调用不同的方法
    if (uploadType === 'video_public') {
      uploadVideoPublic(fileJson.file, observer)
    } else if (uploadType === 'video_private') {
      uploadVideoPrivate(fileJson.file, observer)
    } else { // other
      uploadOther(fileJson.file, observer)
    }
  }
}

// ================================= 《 针 对 项 目 封 装 》

/** 上传视频到七牛
 * @param  {} file 文件
 * @param  {} observer 回调(实现下面有例子)
 */
 export function uploadVideoPublic (file, observer) {
  upload(file, observer, 'public_video')
}

/** 上传视频到七牛（带视频宽高）
 * @param  {} file 文件
 * @param  {} observer 回调(实现下面有例子)
 */
export function uploadVideoPrivate (file, observer) {
  const url = URL.createObjectURL(file)
  const video = document.createElement('video')
  video.onloadedmetadata = () => {
    URL.revokeObjectURL(url)
    upload(file, observer, 'private_video', video.videoWidth, video.videoHeight)
  }
  video.src = url
  video.load()
}

/** 上传任何文件到七牛（图片、文件、视频、...）
 * @param  {} file 文件
 * @param  {} observer 回调(实现下面有例子)
 */
export function uploadOther (file, observer) {
  upload(file, observer, 'other')
}

// =================================《 封 装 七 牛 上 传 》

/** 上传文件到七牛
 * @param  {} file 文件
 * @param  {} observer 回调(实现下面有例子)
 * @param  {} type 来源['video', 'image', 'doc']
 * @param  {} width 视频宽度
 * @param  {} height 视频高度
 */
export function upload (file, observer, type, width, height) {
  // 获取文件后缀
  const extend = file.name.substr(file.name.lastIndexOf('.') + 1)
  // 服务器获取 token 参数
  const params = {
    type: type,
    width: width || 0,
    height: height || 0,
    extend: extend
  }
  // 从服务器获取七牛 token
  getQiNiuToken(params).then(res => {
    const { code, data } = res
    if (code === 0) {
      // 获得 token 开始上传
      var subscription = uploadBase(file, data.token, data.uuid, observer)
      // 支持取消
      if (observer.cancel) { observer.cancel(subscription) }
    } else {
      observer.error(new Error('获取七牛Token失败!'))
    }
  }).catch(err => {
    observer.error(err)
  })
}

/** 上传文件到七牛
 * @param  {} file 文件
 * @param  {} token 七牛 Token
 * @param  {} key 上传到七牛的文件名
 * @param  {} observer 回调(实现下面有例子)
 */
export function uploadBase (file, token, key, observer) {
  const putExtra = {
    fname: '',
    params: {},
    mimeType: null
  }
  const config = {
    useCdnDomain: true,
    region: qiniu.region.z0
  }
  // 上传对象
  const observable = qiniu.upload(file, key, token, putExtra, config)
  // 开始上传
  return observable.subscribe(observer)
  // 取消上传
  // var subscription = observable.subscribe(observer)
  // subscription.unsubscribe()
}

/** 取消指定七牛对象上传
 * @param  {} qiniu 七牛对象
 */
export function uploadCancel (qiniu) {
  qiniu.unsubscribe()
}

/*
const observer = {
  cancel (qiniu) {
    // 获取到七牛对象，可以随时进行取消
  },
  next (res) {
    // 接收上传进度信息，res 参数是一个带有 total 字段的 object，包含loaded、total、percent三个属性
    // total.loaded: number，已上传大小，单位为字节。
    // total.total: number，本次上传的总量控制信息，单位为字节，注意这里的 total 跟文件大小并不一致。
    // total.percent: number，当前上传进度，范围：0～100。
    console.log('上传进度', res)
  },
  error (err) {
    console.log('上传失败', err)
  },
  complete (res) {
    console.log('上传完成', res)
  }
}
*/
