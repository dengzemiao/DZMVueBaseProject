import { uploadOther, uploadVideoPrivate, uploadVideoPublic } from '@/utils/qiniu'

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
