<template>
  <div class="container-full-column-center">
    <span>BASE PROJECT</span>
    <span>Vue 2.x</span>
    <span>{{ env }}</span>
  </div>
</template>

<script>

export default {
  data () {
    return {
      env: process.env
    }
  }
}
</script>

<style scoped>
.container-full-column-center {
  font-size: 45px;
}
</style>
