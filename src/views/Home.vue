<template>
  <div class="container-full-column-center">
    <!-- 提示 -->
    <span>BASE PROJECT</span>
    <span>Vue 2.x</span>
    <!-- 加载组件 -->
    <Loading :loading="isLoading"></Loading>
    <!-- 按钮 -->
    <van-button type="primary" style="margin-top: 15px;">Vant UI 已安装</van-button>
    <!-- 上传组件 -->
    <Upload style="margin-top: 15px;" :beforeUploadPro="beforeUploadPro" :uploadResult="uploadResult"></Upload>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import Upload from '@/components/Upload'
export default {
  components: {
    Loading,
    Upload
  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    // 准备上传
    beforeUploadPro () {
      return true
    },
    // 上传结果
    uploadResult (fileJson, res) {
      // 上传中信息输出
      // console.log(fileJson, res)
      // 上传结果判断
      if (fileJson.status === 'done') {
        this.$toast.success('上传成功');
      } else if (fileJson.status === 'failed') {
        this.$toast.fail('上传失败');
      } else {
        // console.log('正在上传');
      }
    }
  }
}
</script>

<style scoped>
.container-full-column-center {
  font-size: 45px;
}
</style>
