<template>
  <div v-if="loading" :class="loading ? 'loading loading-show' : 'loading'">
    <van-loading class="loading-content" />
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: () => false
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
  color: #1989fa;
  margin: 0 auto;
}
</style>
