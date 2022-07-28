<template>
  <div v-if="loading" :class="loading ? 'loading loading-show' : 'loading'">
    <a-spin class="loading-content" :size="size" />
  </div>
</template>

<script>
export default {
  props: {
    // 加载状态
    loading: {
      type: Boolean,
      default: () => false
    },
    // Icon大小：small、default、large
    size: {
      type: String,
      default: () => 'default'
    }
  }
}
</script>

<style scoped>
.loading {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  z-index: 200;
  background: rgba(255, 255, 255, 0.45);
  opacity: 0;
  transition: all 0.25s;
}
.loading-show {
  opacity: 1;
}
.loading-content {
  margin: 0 auto;
}
</style>
