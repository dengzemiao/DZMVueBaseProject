<template>
  <div class="container">
    <!-- 版本信息 -->
    <div>Base Project</div>
    <div>Vite + Vue 3.x</div>
    <!-- Antdv 安装提示 -->
    <a-alert message="Antdv 已安装" style="margin-top: 15px;" type="success" show-icon />
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { getHuoShanOssToken } from '@/api/request';

onBeforeMount(() => {
  // 打印环境变量
  console.log('onBeforeMount', import.meta.env.VITE_API_BASE_URL);
  // 测试接口请求
  getHuoShanOssToken().then(res => {
    console.log('getHuoShanOssToken', res);
  })
})
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 45px;
}
</style>
