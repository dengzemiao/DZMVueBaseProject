<template>
  <div v-if="loading" class="loading-container loading-container-show">
    <a-spin class="loading-spin" :size="size" />
  </div>
</template>

<script setup>
defineProps({
  // 加载状态
  loading: {
    type: Boolean,
    default: true
  },
  // Icon大小：small、default、large
  size: {
    type: String,
    default: 'default'
  }
})
</script>

<style scoped>
.loading-container {
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
.loading-container-show {
  opacity: 1;
}
.loading-spin {
  margin: 0 auto;
}
</style>
