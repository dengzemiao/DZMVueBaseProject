<template>
  <div class="preview-modal">
    <!-- 图片预览 -->
    <PerviewImageModal ref="perview-image-modal"></PerviewImageModal>
    <!-- 视频预览 -->
    <PerviewVideoModal ref="perview-video-modal"></PerviewVideoModal>
  </div>
</template>

<script>
import Pub from '@/utils/public'
import PerviewImageModal from './PerviewImageModal'
import PerviewVideoModal from './PerviewVideoModal'
export default {
  props: {
    // 允许预览
    isPerview: {
      type: Boolean,
      default: () => true
    },
    // 允许图片预览
    isPerviewImage: {
      type: Boolean,
      default: () => true
    },
    // 允许视频预览
    isPerviewVideo: {
      type: Boolean,
      default: () => true
    },
    // 允许新开窗口访问不能识别的链接
    isPerviewOutside: {
      type: Boolean,
      default: () => false
    }
  },
  components: {
    PerviewImageModal,
    PerviewVideoModal
  },
  methods: {
    showModal (url) {
      // 允许预览 && 路径有值
      if (this.isPerview && url) {
        // 判断预览
        if (Pub.FILE_IS_IMAGE(url) && this.isPerviewImage) {
          // 图片地址 && 允许图片预览
          this.$refs['perview-image-modal'].showModal(url)
        } else if (Pub.FILE_IS_VIDEO(url) && this.isPerviewVideo) {
          // 视频地址 && 允许视频预览
          this.$refs['perview-video-modal'].showModal(url)
        } else if (this.isPerviewOutside) {
          // 不能识别的地址 && 允许外链预览
          Pub.OPEN_URL(url)
        }
      }
    }
  }
}
</script>

<style>

</style>
