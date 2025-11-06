<template>
  <div class="container">
    <!-- 版本信息 -->
    <div>Base Project</div>
    <div style="margin-top: 8px;">Vite + Vue 3.x</div>
    <!-- Antdv 安装提示 -->
    <a-alert message="Antdv 已安装" style="margin-top: 15px;" type="success" show-icon />
    <!-- 跳转 layout 布局样式 -->
    <a-button style="margin-top: 15px;" @click="touchLayout">跳转 Layout 布局样式（自定义菜单，菜单 icon 支持：自带icon、iconfont、本地icon）</a-button>
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { getHuoShanOssToken } from '@/api/request';
import Pub from '@/utils/public';

onBeforeMount(() => {
  // 打印环境变量
  console.log('onBeforeMount', import.meta.env.VITE_API_BASE_URL);
  // 测试接口请求
  getHuoShanOssToken().then(res => {
    console.log('getHuoShanOssToken', res);
  })
})

// 跳转 layout
const touchLayout = () => {
  Pub.jumpRouter('/layout')
}
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
