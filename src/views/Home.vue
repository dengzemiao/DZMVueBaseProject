<template>
  <div class="container-full-column-center">
    <!-- 提示 -->
    <span>BASE PROJECT</span>
    <span>Vue 2.x</span>
    <!-- 安装提示 -->
    <a-alert message="Antdv 已安装" style="margin-top: 15px;" type="success" show-icon />
    <!-- 加载组件 -->
    <Loading :loading="isLoading"></Loading>
    <!-- 上传组件 -->
    <Upload :beforeUploadPro="beforeUploadPro" :uploadResult="uploadResult"></Upload>
    <!-- 预览组件 -->
    <a-button style="margin-top: 15px;" @click="touchPreview">预览组件、图片、视频、文件</a-button>
    <PreviewModal ref="preview-modal"></PreviewModal>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import Upload from '@/components/Upload'
import PreviewModal from '@/components/preview/PreviewModal'
export default {
  components: {
    Loading,
    Upload,
    PreviewModal
  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    // 准备上传
    beforeUploadPro () {
      this.isLoading = true
      return true
    },
    // 上传结果
    uploadResult (fileJson, res) {
      // 上传中信息输出
      console.log(fileJson, res)
      // 进入加载
      this.isLoading = false
      // 上传结果判断
      if (fileJson.status === 'done') {
        this.$message.success('上传成功')
      } else if (fileJson.status === 'error') {
        this.$message.error('上传失败')
      } else {
        // console.log('正在上传');
      }
    },
    // 进入预览
    touchPreview () {
      // 预览图片
      this.$refs['preview-modal'].showModal('https://img1.baidu.com/it/u=2777480701,3081791725&fm=26&fmt=auto&gp=0.jpg')

      // 预览视频
      // this.$refs['preview-modal'].showModal('https://media.w3.org/2010/05/sintel/trailer.mp4')

      // 预览文件
      // this.$refs['preview-modal'].showModal('https://image.baidu.com/search/index?tn=baiduimage&ps=1&ct=201326592&lm=-1&cl=2&nc=1&ie=utf-8&word=%E7%BE%8E%E5%A5%B3')

      // 后缀在文件中间的情况预览
      // this.$refs['preview-modal'].showModal('https://vprivate.hepai.video/local/private_video/8931135415d90e8aca799c81c084487f.mp4?e=1624260783&token=AciT33E89duMqx4Q_mkGN6SJ6bUDRkk-zRxN-v8P:BRIhB2UpzRwtthXr-JsdBVWoC4U=')
    }
  }
}
</script>

<style scoped>
.container-full-column-center {
  font-size: 45px;
}
</style>
