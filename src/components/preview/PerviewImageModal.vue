<template>
  <a-modal
    title="预览图片"
    :visible="visible"
    :maskClosable="false"
    :footer="null"
    @ok="handleCancel"
    @cancel="handleCancel"
  >
    <div class="preview-content">
      <img v-if="url" :src="url">
    </div>
  </a-modal>
</template>

<script>
export default {
  data () {
    return {
      // 是否展示
      visible: false,
      // 图片地址
      url: undefined
    }
  },
  methods: {
    // 显示
    showModal (url) {
      this.url = url
      this.visible = true
    },
    // 关闭
    handleCancel () {
      // 延迟清空
      setTimeout(() => {
        this.url = undefined
      }, 200)
      // 隐藏
      this.visible = false
    }
  }
}
</script>

<style scoped>
.preview-content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.preview-content img {
  width: 100%;
  height: 100%;
  max-width: 500px;
  max-height: 500px;
  object-fit: contain;
}
</style>
