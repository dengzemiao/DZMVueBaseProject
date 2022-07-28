<template>
  <div class="container-full-column-center">
    <!-- 提示 -->
    <span>BASE PROJECT</span>
    <span>Vue 3.x <component :is="$icons['BugOutlined']" /></span>
    <!-- 安装提示 -->
    <a-alert message="Antdv 已安装" style="margin-top: 15px;" type="success" show-icon />
    <!-- 加载组件 -->
    <Loading :loading="isLoading"></Loading>
    <!-- 上传组件 -->
    <Upload :beforeUploadPro="beforeUploadPro" :uploadResult="uploadResult"></Upload>
    <!-- 跳转 layout 布局样式 -->
    <a-button style="margin-top: 15px;" @click="touchLayout">跳转 Layout 布局样式（自定义菜单，菜单 icon 支持：自带icon、iconfont、本地icon）</a-button>
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
    // 跳转 layout
    touchLayout () {
      this.$router.push('/layout')
    }
  }
}
</script>

<style scoped>
.container-full-column-center {
  font-size: 45px;
}
</style>
