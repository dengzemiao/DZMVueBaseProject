<template>
  <div class="container-full-column-center">
    <span>BASE PROJECT</span>
    <span>Vue 2.x</span>
    <a-alert message="Antdv 已安装" style="margin-top: 15px;" type="success" show-icon />
    <Loading :loading="isLoading"></Loading>
    <Upload :beforeUploadPro="beforeUploadPro" :uploadResult="uploadResult"></Upload>
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
    beforeUploadPro () {
      this.isLoading = true
      return true
    },
    uploadResult (fileJson, res) {
      console.log(fileJson, res)
      this.isLoading = false
      if (fileJson.status === 'done') {
        this.$message.success('上传成功')
      } else if (fileJson.status === 'error') {
        this.$message.error('上传失败')
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
