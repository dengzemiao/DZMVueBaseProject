<template>
  <!-- 主视图 -->
  <div class="upload-view">
    <!--  a-upload-dragger 组件 -->
    <a-upload-dragger
      v-if="isDragger"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      :showUploadList="showUploadList"
      :fileList="fileList"
      :beforeUpload="beforeUpload"
      :customRequest="customRequest"
      @remove="remove"
    >
      <!-- 自定义上传组件 -->
      <slot name="up-slot" :disabled="disabled">
        <!-- icon -->
        <p class="ant-upload-drag-icon">
          <!-- 上传 icon -->
          <slot name="up-icon"><inbox-outlined /></slot>
        </p>
        <!-- 文案 -->
        <p class="ant-upload-text">
          <!-- 上传文案 -->
          <slot name="up-title">点击或拖拽文件到此区域上传</slot>
        </p>
        <!-- 提示文案 -->
        <p class="ant-upload-hint">
          <!-- 上传提示文案 -->
          <slot name="up-hint">支持单次或批量上传</slot>
        </p>
      </slot>
    </a-upload-dragger>
    <!--  a-upload 组件 -->
    <a-upload
      v-else
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      :showUploadList="showUploadList"
      :fileList="fileList"
      :beforeUpload="beforeUpload"
      :customRequest="customRequest"
      @remove="remove"
    >
      <!-- 自定义上传组件 -->
      <slot name="up-slot" :disabled="disabled">
        <!-- 上传按钮 -->
        <a-button :disabled="disabled">
          <!-- 上传 icon -->
          <slot name="up-icon"><upload-outlined /></slot>
          <!-- 上传文案 -->
          <slot name="up-title">上传文件</slot>
        </a-button>
      </slot>
    </a-upload>
  </div>
</template>

<script>

// GitHub 地址：https://github.com/dengzemiao/DZMAntdvUpload

import { uploadQiNiu } from '@/utils/qiniu'
export default {
  props: {

    // =============================== 原生属性 - a-upload 自带属性扩展 ========

    // 启用拖拽上传
    // (false: 使用 a-upload 组件，true: 使用 a-upload-dragger 组件)
    isDragger: {
      type: Boolean,
      default: () => false
    },
    // 接受上传的文件类型
    // 参考地址：https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers
    // 音频：'audio/*'
    // 视频：'video/*'
    // 图片：'image/*'
    // 特殊匹配自行传入正则
    accept: {
      type: String,
      default: () => undefined
    },
    // 已经上传的文件列表（受控）
    // 文件案例：
    // [{
    //   uid: '必带，文件唯一标识',
    //   name: '必带，文件名',
    //   // uploading(上传中)、done(上传成功)、error(上传失败)、removed(移除，点击组件自带的删除按钮会被设置为移除状态，通常只需要前三种状态)
    //   status: '必带，上传状态',
    //   url: '可选，有链接可以进行跳转',
    //   dupid: '可选，防止重复文件标识(file.lastModified)',
    //   upid: '可选，本轮上传唯一标识，提交服务器时可剔除',
    //   如果需要什么其他字段或辅助字段，可以自行添加，或者通过拦截 beforeUploadPro 拿到 fileJson 自行附带
    // }]
    fileList: {
      type: Array,
      default: () => []
    },
    // 是否展示上传列表
    showUploadList: {
      type: Boolean,
      default: () => false
    },
    // 是否支持多选文件，ie10+ 支持。开启后按住 ctrl 可选择多个文件。
    multiple: {
      type: Boolean,
      default: () => false
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: () => false
    },
    // 准备上传，回调钩子，若返回 false 则停止上传
    // 类型：(file, fileList, fileJson) => boolean || Promise
    beforeUploadPro: {
      type: Function,
      default: undefined
    },
    // 自定义上传，回调钩子，可以自定义自己的上传实现，
    // 类型：(data, fileJson, (isSuccess) => {}) => {}
    customRequestPro: {
      type: Function,
      default: undefined
    },
    // 点击移除文件时的回调，返回值为 false 时不移除
    // 类型：(file) => boolean || Promise
    removePro: {
      type: Function,
      default: undefined
    },
    // =============================== 公用检测 - 文件检测 ========
    // 文件检测模式：
    // 0 -> 不检测
    // 1 -> 本次选择的所有文件，检测失败的移除，成功的上传
    // 2 -> 本次选择的所有文件，有一个检测失败，全部移除
    fileCheckMode: {
      type: Number,
      default: () => 2
    },

    // =============================== 公用检测 - 检测错误控制 ========

    // 每轮文件上传检测错误抛出模式:
    // 0 -> 不限制，有多少错误正常抛出，可以通过每轮的 uploadId 自行判断重复问题
    // 1 -> 本轮检测错误只会抛出一次，如果本轮有多次错误，只会抛出第一次的错误，后续错误都不会在抛出
    // 每轮：也就是每次点击上传按钮选择文件后确定上传算一轮，也是本次提交（单选多选都一样）
    errorMode: {
      type: Number,
      default: () => 1
    },
    // 错误唯一标识（uploadId）存放（只在模式为 2 时生效）
    errorUploadIds: {
      type: Array,
      default: () => []
    },

    // =============================== 公用检测 - 文件数量限制 ========

    // 上传文件数量限制：0 -> 不限制，随便传
    fileNumber: {
      type: Number,
      default: () => 0
    },
    // 上传文件数量限制检测失败提示
    fileNumberError: {
      type: String,
      default: () => '已超出上传文件数量限制'
    },
    // 上传文件数量限制失败提示，实现这个将不使用 fileRepeatError
    // 类型：(file, fileList, uploadId) => {}
    // uploadId：本次上传操作唯一ID，多选文件模式可通过该唯一ID只显示一次错误
    fileNumberErrorPro: {
      type: Function,
      default: undefined
    },

    // =============================== 公用检测 - 文件重复 ========

    // 文件重复检测模式:
    // 0 -> 允许重复
    // 1 -> 禁止重复文件(多选模式：本次选择的所有文件，重复文件移除，不重复文件上传)
    // 2 -> 禁止重复文件(多选模式：本次选择的所有文件，有一个存在重复，全部移除)
    fileRepeatMode: {
      type: Number,
      default: () => 2
    },
    // 文件重复检测失败提示
    fileRepeatError: {
      type: String,
      default: () => '不能重复导入文件'
    },
    // 文件重复检测失败提示，实现这个将不使用 fileRepeatError
    // 类型：(file, fileList, uploadId, repeatFiles) => {}
    // uploadId：本次上传操作唯一ID，多选文件模式可通过该唯一ID只显示一次错误
    // repeatFiles: 重复文件列表
    fileRepeatErrorPro: {
      type: Function,
      default: undefined
    },

    // =============================== 公用检测 - 文件大小 ========

    // 文件大小检测模式（单位 kb）:
    // 0 -> 关闭
    // 1 -> 小于
    // 2 -> 大于
    // 3 -> 等于
    // 11 -> 小于或等于
    // 22 -> 大于或等于
    kbCompareMode: {
      type: Number,
      default: () => 0
    },
    // 文件大小（单位 kb）
    kbCompareSize: {
      type: Number,
      default: () => 0
    },
    // 文件大小检测失败提示
    kbCompareError: {
      type: String,
      default: () => '文件大小与设定范围不匹配'
    },
    // 文件大小检测失败提示回调，实现这个将不使用 kbCompareError
    // 类型：(file, fileList, uploadId) => {}
    // uploadId：本次上传操作唯一ID，多选文件模式可通过该唯一ID只显示一次错误
    kbCompareErrorPro: {
      type: Function,
      default: undefined
    },

    // =============================== 图片检查 - 宽高限制 ========

    // 图片宽高检测模式（单位 px）:
    // 0 -> 关闭
    // 1 -> 小于
    // 2 -> 大于
    // 3 -> 等于
    // 11 -> 小于或等于
    // 22 -> 大于或等于
    imgSizeMode: {
      type: Number,
      default: () => 0
    },
    // 图片宽度（单位 px）
    imgSizeWidth: {
      type: Number,
      default: () => 0
    },
    // 图片高度（单位 px）
    imgSizeHeight: {
      type: Number,
      default: () => 0
    },
    // 图片宽高检测失败提示
    imgSizeError: {
      type: String,
      default: () => '图片宽高与设定宽高不匹配'
    },
    // 图片宽高检测失败提示回调，实现这个将不使用 imgSizeError
    // 类型：(file, fileList, uploadId) => {}
    // uploadId：本次上传操作唯一ID，多选文件模式可通过该唯一ID只显示一次错误
    imgSizeErrorPro: {
      type: Function,
      default: undefined
    },

    // =============================== 图片检查 - 比例限制 ========

    // 图片比例检测模式（单位 px）:
    // 0 -> 关闭
    // 1 -> 开启
    imgScaleMode: {
      type: Number,
      default: () => 0
    },
    // 图片宽度比例
    imgScaleWidth: {
      type: Number,
      default: () => 0
    },
    // 图片高度比例
    imgScaleHeight: {
      type: Number,
      default: () => 0
    },
    // 图片比例检测失败提示
    imgScaleError: {
      type: String,
      default: () => '图片比例与设定比例不匹配'
    },
    // 图片比例检测失败提示回调，实现这个将不使用 imgScaleError
    // 类型：(file, fileList, uploadId) => {}
    // uploadId：本次上传操作唯一ID，多选文件模式可通过该唯一ID只显示一次错误
    imgScaleErrorPro: {
      type: Function,
      default: undefined
    },

    // =============================== 视频检查 - 宽高限制 ========

    // 视频宽高检测模式（单位 px）:
    // 0 -> 关闭
    // 1 -> 小于
    // 2 -> 大于
    // 3 -> 等于
    // 11 -> 小于或等于
    // 22 -> 大于或等于
    videSizeMode: {
      type: Number,
      default: () => 0
    },
    // 视频宽度（单位 px）
    videSizeWidth: {
      type: Number,
      default: () => 0
    },
    // 视频高度（单位 px）
    videSizeHeight: {
      type: Number,
      default: () => 0
    },
    // 视频宽高检测失败提示
    videSizeError: {
      type: String,
      default: () => '视频宽高与设定宽高不匹配'
    },
    // 视频宽高检测失败提示回调，实现这个将不使用 videSizeError
    // 类型：(file, fileList, uploadId) => {}
    // uploadId：本次上传操作唯一ID，多选文件模式可通过该唯一ID只显示一次错误
    videSizeErrorPro: {
      type: Function,
      default: undefined
    },

    // =============================== 视频检查 - 比例限制 ========

    // 视频比例检测模式（单位 px）:
    // 0 -> 关闭
    // 1 -> 开启
    videScaleMode: {
      type: Number,
      default: () => 0
    },
    // 视频宽度比例
    videScaleWidth: {
      type: Number,
      default: () => 0
    },
    // 视频高度比例
    videScaleHeight: {
      type: Number,
      default: () => 0
    },
    // 视频比例检测失败提示
    videScaleError: {
      type: String,
      default: () => '视频比例与设定比例不匹配'
    },
    // 视频比例检测失败提示回调，实现这个将不使用 videScaleError
    // 类型：(file, fileList, uploadId) => {}
    // uploadId：本次上传操作唯一ID，多选文件模式可通过该唯一ID只显示一次错误
    videScaleErrorPro: {
      type: Function,
      default: undefined
    },

    // =============================== 自定义属性存放 ========

    // 上传的类型：
    // video_private  私有视频类型
    // video_public 公共视频类型
    // other  其他
    uploadType: {
      type: String,
      default: 'other'
    },
    // 如果自定义上传写在本组件内部，回调结果自行决定，外层通过 fileJson.status 判断成功失败即可
    // 例如：(fileJson, err || res) => {}
    uploadResult: {
      type: Function,
      default: undefined
    }
  },
  methods: {
    // 自定义上传
    customRequest (data) {
      // 找到对应的上传文件对象
      const fileJson = this.fileList.find((item) => {
        return data.file.uid === item.uid
      })
      // 自定义上传服务器
      if (this.customRequestPro) {
        // 自定义请求
        this.customRequestPro(data, fileJson, (isSuccess) => {
          // uploading(上传中)、done(上传成功)、error(上传失败)
          const status = isSuccess ? 'done' : 'error'
          this.customRequestResult(fileJson, status)
        })
      } else {
        // this.showError('请自己实现 customRequestPro 自定义上传操作！')
        // 如果需要将上传写到内部这里，回调结果看情况自定义，外层通过 fileJson.status 判断成功失败即可
        // if (this.uploadResult) { this.uploadResult(isOK, fileJson, err || res) }
        // 例如：(七牛上传，给与参考，推荐将下面这段上传封装成一个公共 funcation，在需要用到重新上传按钮的操作时，可以传入指定参数重新上传)
        // 将 file 文件带入到 fileJson 中
        fileJson.file = data.file
        // 开始上传
        uploadQiNiu(fileJson, this.uploadResult, this.uploadType)
      }
    },
    // 准备上传
    beforeUpload (file, fileList) {
      // 开始检测
      return new Promise((resolve, reject) => {
        // ----------------------------- 公用赋值 - 配置上传本轮唯一ID --------

        // 获取上传本轮唯一ID，检查 file 对象是否有带本轮唯一ID
        var uploadId = file.uploadId
        // 没有则是新的一轮选择，需要新获取本轮唯一ID
        if (!uploadId) {
          // 获取到本轮唯一ID
          uploadId = this.getUploadId()
          // 全部文件进行赋值
          fileList.forEach(item => {
            item.uploadId = uploadId
          })
        }

        // ----------------------------- 公用检测 - 文件数量限制 --------

        // 总文件数量
        if (this.fileNumber !== 0) {
          // 文件总数量
          const total = this.fileList.length + fileList.length
          // 如果文件总数量超过文件限制数量则停止上传
          if (total > this.fileNumber) {
            // 是否允许抛出错误
            if (!this.isExistErrorUploadId(uploadId)) {
              // 有错误回调
              if (this.fileNumberErrorPro) {
                // 错误回调
                this.fileNumberErrorPro(file, fileList, uploadId)
              } else {
                // 有错误文案
                if (this.fileNumberError) { this.showError(this.fileNumberError) }
              }
            }
            // 不允许上传
            reject(new Error())
            return
          }
        }

        // ----------------------------- 公用检测 - 文件检测 --------

        // 文件对象
        const fileJson = {
          // 唯一标识符
          uid: file.uid,
          // 文件名
          name: file.name,
          // 文件状态：uploading(上传中)、done(上传成功)、error(上传失败)
          status: 'uploading',
          // 防止重复标识
          dupid: file.lastModified,
          // 本轮上传ID(上传服务器可剔除)
          upid: uploadId
          // 其他自用字段可自行附带
        }

        // 文件检测 - 同步
        if (this.fileCheckMode !== 0) {
          // 匹配检测模式
          if (this.fileCheckMode === 1) {
            // 本次选择的所有文件，检测失败的移除，成功的上传
            this.fileCheck(file, fileList, uploadId).then(() => {
              // 准备上传 预处理 结束
              this.beforeUploadProEnd(file, fileList, fileJson, resolve, reject)
            }).catch(() => {
              // 不允许上传
              reject(new Error())
            })
          } else if (this.fileCheckMode === 2) {
            // 本次选择的所有文件，有一个检测失败，全部移除
            // Promise 数组
            const ps = []
            // 存放 Promise
            fileList.forEach(item => {
              ps.push(this.fileCheck(item, fileList, uploadId))
            })
            // 全部请求
            Promise.all(ps).then(() => {
              // 准备上传 预处理 结束
              this.beforeUploadProEnd(file, fileList, fileJson, resolve, reject)
            }).catch(() => {
              // 不允许上传
              reject(new Error())
            })
          } else {
            // 准备上传 预处理 结束
            this.beforeUploadProEnd(file, fileList, fileJson, resolve, reject)
          }
        } else {
          // 准备上传 预处理 结束
          this.beforeUploadProEnd(file, fileList, fileJson, resolve, reject)
        }
      })
    },
    // 准备上传 - 预处理 结束
    beforeUploadProEnd (file, fileList, fileJson, resolve, reject) {
      // 准备上传 预处理
      this.beforeUploadProReady(file, fileList, fileJson).then(() => {
        // 加入文件列表
        this.fileList.push(fileJson)
        // 允许上传
        resolve()
      }).catch(() => {
        // 不允许上传
        reject(new Error())
      })
    },
    // 准备上传 - 预处理 开始
    beforeUploadProReady (file, fileList, fileJson) {
      // 预处理
      return new Promise((resolve, reject) => {
        // 外传回调
        if (this.beforeUploadPro) {
          // 获取回调结果
          const p = this.beforeUploadPro(file, fileList, fileJson)
          // 检测返回类型
          if (typeof (p) === 'boolean') {
            // 是否为 Boolean
            if (p) {
              // 允许上传
              resolve()
            } else {
              // 不允许上传
              reject(new Error())
            }
          } else if (!!p && (typeof (p) === 'object' || typeof obj === 'function') && typeof (p.then) === 'function') {
            // 是否为 Promise
            p.then(() => {
              // 允许上传
              resolve()
            }).catch(() => {
              // 不允许上传
              reject(new Error())
            })
          }
        } else {
          // 允许上传
          resolve()
        }
      })
    },
    // 点击移除文件时的回调
    remove (file) {
      // 预处理
      return new Promise((resolve, reject) => {
        // 外传回调
        if (this.removePro) {
          // 获取回调结果
          const p = this.removePro(file)
          // 检测返回类型
          if (typeof (p) === 'boolean') {
            // 是否为 Boolean
            if (p) {
              // 删除文件
              const index = this.fileList.indexOf(file)
              this.fileList.splice(index, 1)
              // 允许删除
              resolve()
            } else {
              // 不允许删除
              reject(new Error())
            }
          } else if (!!p && (typeof (p) === 'object' || typeof obj === 'function') && typeof (p.then) === 'function') {
            // 是否为 Promise
            p.then(() => {
              // 删除文件
              const index = this.fileList.indexOf(file)
              this.fileList.splice(index, 1)
              // 允许上传
              resolve()
            }).catch(() => {
              // 不允许删除
              reject(new Error())
            })
          }
        } else {
          // 删除文件
          const index = this.fileList.indexOf(file)
          this.fileList.splice(index, 1)
          // 允许删除
          resolve()
        }
      })
    },
    // 文件检测 - 同步
    fileCheck (file, fileList, uploadId) {
      // 预处理
      return new Promise((resolve, reject) => {
        // ----------------------------- 公用检测 - 文件重复 --------

        // 判断重复文件
        if (this.fileRepeatMode !== 0) {
          // 获取重复列表
          const repeatFiles = []
          fileList.forEach(itemOne => {
            this.fileList.some(itemTwo => {
              // 检测到重复文件 名称相同 && 最后修改时间相同 && 上传ID不相同
              const isRepeat = itemOne.name === itemTwo.name && itemOne.lastModified === itemTwo.dupid && uploadId !== itemTwo.upid
              if (isRepeat) { repeatFiles.push(itemOne) }
              return isRepeat
            })
          })
          // 根据重复类型检测
          if (this.fileRepeatMode === 1) {
            // 禁止重复文件(多选模式：本次选择的所有文件，重复文件移除，不重复文件上传)
            const isRepeat = this.fileList.some(item => {
              return file.name === item.name && file.lastModified === item.dupid
            })
            // 存在重复
            if (isRepeat) {
              // 是否允许抛出错误
              if (!this.isExistErrorUploadId(uploadId)) {
                // 有错误回调
                if (this.fileRepeatErrorPro) {
                  // 错误回调
                  this.fileRepeatErrorPro(file, fileList, uploadId, repeatFiles)
                } else {
                  // 有错误文案
                  if (this.fileRepeatError) { this.showError(this.fileRepeatError) }
                }
              }
              // 检测失败
              reject(new Error())
              return
            }
          } else if (this.fileRepeatMode === 2) {
            // 禁止重复文件(多选模式：本次选择的所有文件，有一个存在重复，全部移除)
            const isRepeat = Boolean(repeatFiles.length)
            // 存在重复
            if (isRepeat) {
              // 是否允许抛出错误
              if (!this.isExistErrorUploadId(uploadId)) {
                // 有错误回调
                if (this.fileRepeatErrorPro) {
                  // 错误回调
                  this.fileRepeatErrorPro(file, fileList, uploadId, repeatFiles)
                } else {
                  // 有错误文案
                  if (this.fileRepeatError) { this.showError(this.fileRepeatError) }
                }
              }
              // 检测失败
              reject(new Error())
              return
            }
          }
        }

        // ----------------------------- 公用检测 - 文件大小 --------

        // 开启了 - 文件大小检测
        if (this.kbCompareMode !== 0) {
          // 检测结果
          var isOK = true
          // 获取文件大小（单位：kb）
          const fileSize = file.size / 1024
          // 开始检测
          if (this.kbCompareMode === 1) {
            // 小于
            isOK = fileSize < this.kbCompareSize
          } else if (this.kbCompareMode === 2) {
            // 大于
            isOK = fileSize > this.kbCompareSize
          } else if (this.kbCompareMode === 3) {
            // 等于
            isOK = fileSize === this.kbCompareSize
          } else if (this.kbCompareMode === 11) {
            // 小于等于
            isOK = fileSize <= this.kbCompareSize
          } else if (this.kbCompareMode === 22) {
            // 大于等于
            isOK = fileSize >= this.kbCompareSize
          } else {}
          // 判断检测结果
          if (!isOK) {
            // 是否允许抛出错误
            if (!this.isExistErrorUploadId(uploadId)) {
              // 有错误回调
              if (this.kbCompareErrorPro) {
                // 错误回调
                this.kbCompareErrorPro(file, fileList, uploadId)
              } else {
                // 有错误文案
                if (this.kbCompareError) { this.showError(this.kbCompareError) }
              }
            }
            // 检测失败
            reject(new Error())
            return
          }
        }

        // ----------------------------- 图片检查 - 宽高限制 - 比例限制 --------

        // 图片检测
        if ((this.imgSizeMode !== 0 || this.imgScaleMode !== 0) && this.isImage(file.name)) {
          // 获取图片宽高
          this.imageSize(file, (imgWidth, imgHeight) => {
            // 图片检测 - 宽高限制
            if (this.imgSizeMode !== 0) {
              // 检测结果
              var isOK = true
              // 开始检测
              if (this.imgSizeMode === 1) {
                // 小于
                isOK = (imgWidth < this.imgSizeWidth && imgHeight < this.imgSizeHeight)
              } else if (this.kbCompareMode === 2) {
                // 大于
                isOK = (imgWidth > this.imgSizeWidth && imgHeight > this.imgSizeHeight)
              } else if (this.imgSizeMode === 3) {
                // 等于
                isOK = (imgWidth === this.imgSizeWidth && imgHeight === this.imgSizeHeight)
              } else if (this.imgSizeMode === 11) {
                // 小于等于
                isOK = (imgWidth <= this.imgSizeWidth && imgHeight <= this.imgSizeHeight)
              } else if (this.imgSizeMode === 22) {
                // 大于等于
                isOK = (imgWidth >= this.imgSizeWidth && imgHeight >= this.imgSizeHeight)
              } else {}
              // 判断检测结果
              if (!isOK) {
                // 是否允许抛出错误
                if (!this.isExistErrorUploadId(uploadId)) {
                  // 有错误回调
                  if (this.imgSizeErrorPro) {
                    // 错误回调
                    this.imgSizeErrorPro(file, fileList, uploadId)
                  } else {
                    // 有错误文案
                    if (this.imgSizeError) { this.showError(this.imgSizeError) }
                  }
                }
                // 检测失败
                reject(new Error())
                return
              }
            }
            // 图片检测 - 比例限制
            if (this.imgScaleMode !== 0) {
              // 检测结果
              var isWidth = (imgWidth % this.imgScaleWidth) === 0
              var isHeight = (imgHeight % this.imgScaleHeight) === 0
              // 判断检测结果
              if (!isWidth && !isHeight) {
                // 是否允许抛出错误
                if (!this.isExistErrorUploadId(uploadId)) {
                  // 有错误回调
                  if (this.imgScaleErrorPro) {
                    // 错误回调
                    this.imgScaleErrorPro(file, fileList, uploadId)
                  } else {
                    // 有错误文案
                    if (this.imgScaleError) { this.showError(this.imgScaleError) }
                  }
                }
                // 检测失败
                reject(new Error())
                return
              }
            }
            // 检测成功
            resolve()
          })
          // 不要在向下走了
          return
        }

        // ----------------------------- 视频检查 - 宽高限制 - 比例限制 --------

        // 视频检测
        if ((this.videSizeMode !== 0 || this.videScaleMode !== 0) && this.isVideo(file.name)) {
          // 获取图片宽高
          this.videoSize(file, (videoWidth, videoHeight) => {
            // 图片检测 - 宽高限制
            if (this.videSizeMode !== 0) {
              // 检测结果
              var isOK = true
              // 开始检测
              if (this.videSizeMode === 1) {
                // 小于
                isOK = (videoWidth < this.videSizeWidth && videoHeight < this.videSizeHeight)
              } else if (this.videSizeMode === 2) {
                // 大于
                isOK = (videoWidth > this.videSizeWidth && videoHeight > this.videSizeHeight)
              } else if (this.videSizeMode === 3) {
                // 等于
                isOK = (videoWidth === this.videSizeWidth && videoHeight === this.videSizeHeight)
              } else if (this.videSizeMode === 11) {
                // 小于等于
                isOK = (videoWidth <= this.videSizeWidth && videoHeight <= this.videSizeHeight)
              } else if (this.videSizeMode === 22) {
                // 大于等于
                isOK = (videoWidth >= this.videSizeWidth && videoHeight >= this.videSizeHeight)
              } else {}
              // 判断检测结果
              if (!isOK) {
                // 是否允许抛出错误
                if (!this.isExistErrorUploadId(uploadId)) {
                  // 有错误回调
                  if (this.videSizeErrorPro) {
                    // 错误回调
                    this.videSizeErrorPro(file, fileList, uploadId)
                  } else {
                    // 有错误文案
                    if (this.videSizeError) { this.showError(this.videSizeError) }
                  }
                }
                // 检测失败
                reject(new Error())
                return
              }
            }
            // 图片检测 - 比例限制
            if (this.videScaleMode !== 0) {
              // 检测结果
              var isWidth = (videoWidth % this.videScaleWidth) === 0
              var isHeight = (videoHeight % this.videScaleHeight) === 0
              // 判断检测结果
              if (!isWidth && !isHeight) {
                // 是否允许抛出错误
                if (!this.isExistErrorUploadId(uploadId)) {
                  // 有错误回调
                  if (this.videScaleErrorPro) {
                    // 错误回调
                    this.videScaleErrorPro(file, fileList, uploadId)
                  } else {
                    // 有错误文案
                    if (this.videScaleError) { this.showError(this.videScaleError) }
                  }
                }
                // 检测失败
                reject(new Error())
                return
              }
            }
            // 检测成功
            resolve()
          })
          // 不要在向下走了
          return
        }

        // ----------------------------- 检测成功 --------

        // 检测成功
        resolve()
      })
    },
    // 显示错误，统一管理，方便替换
    showError (message) {
      // 显示错误
      this.$message.error(message)
    },
    // 自定义上传结果
    customRequestResult (fileJson, status) {
      // 设置上传状态
      fileJson.status = status
    },
    // 获取本次上传唯一ID
    getUploadId () {
      // 返回
      return this.UUID()
    },
    // 是否存在本轮错误 uploadId
    isExistErrorUploadId (uploadId) {
      // 当为错误唯一模式的时候才需要检测
      if (this.errorMode === 1) {
        const index = this.errorUploadIds.indexOf(uploadId)
        const isExist = index !== -1
        if (!isExist) {
          this.errorUploadIds.push(uploadId)
        }
        return isExist
      }
      // 不包含
      return false
    },
    // 获取图片尺寸（异步获取）
    imageSize (file, result) {
      // 文件有值
      if (file) {
        // 创建 FileReader
        var reader = new FileReader()
        // 加载文件
        reader.onload = (e) => {
          // 获取 base64 图片数据
          var imgData = e.target.result
          // 通过Image对象加载 base64 图片数据
          var image = new Image()
          // 图片加载完成
          image.onload = () => {
            // 返回宽高
            result(image.width, image.height)
          }
          // 添加图片进行读取
          image.src = imgData
        }
        // 开始读取文件
        reader.readAsDataURL(file)
      } else {
        // 未获取到文件
        result(0, 0)
      }
    },
    // 获取视频尺寸（异步获取）
    videoSize (file, result) {
      // 文件有值
      if (file) {
        // 获取文件URL
        const url = URL.createObjectURL(file)
        // 创建视频标签
        const video = document.createElement('video')
        // 加载视频资源
        video.onloadedmetadata = evt => {
          // 移除
          URL.revokeObjectURL(url)
          // 返回宽高
          result(video.videoWidth, video.videoHeight)
        }
        // 设置视频源
        video.src = url
        // 加载
        video.load()
      } else {
        // 未获取到文件
        result(0, 0)
      }
    },
    // 是否为图片
    isImage (filePath) {
      // 图片后缀
      const types = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff']
      // 文件后缀
      const type = this.fileExtension(filePath)
      // 是否包含
      return types.indexOf(type) !== -1
    },
    // 是否为视频
    isVideo (filePath) {
      // 图片后缀
      const types = ['avi', 'wmv', 'mpg', 'mpeg', 'mov', 'rm', 'ram', 'swf', 'flv', 'mp4', 'mp3', 'wma', 'avi', 'rm', 'rmvb', 'flv', 'mpg', 'mkv']
      // 文件后缀
      const type = this.fileExtension(filePath)
      // 是否包含
      return types.indexOf(type) !== -1
    },
    // 获取文件后缀类型
    fileExtension (filePath) {
      // 获取最后一个.的位置
      var index = filePath.lastIndexOf('.')
      // 获取后缀
      var type = filePath.substr(index + 1)
      // 返回类型
      return type.toLowerCase()
    },
    // 生成 UUID
    UUID () {
      // 生成随机字符串
      function S4 () { return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) }
      // 拼接
      return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
    }
  }
}
</script>

<style>
</style>
