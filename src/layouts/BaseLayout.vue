<template>
  <!-- 主视图 -->
  <a-layout id="layout-main">
    <!-- 左侧菜单 -->
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <!-- logo -->
      <div class="layout-logo" />
      <!-- 中间内容菜单 -->
      <Menu
        class="layout-menu"
        :collapsed="collapsed"
        :menus="menus"
      ></Menu>
    </a-layout-sider>
    <!-- 右侧内容 -->
    <a-layout class="layout-sub">
      <!-- 右侧头部内容 -->
      <a-layout-header class="layout-header">
        <!-- 展开收起 -->
        <menu-unfold-outlined
          v-if="collapsed"
          class="layout-trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="layout-trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <!-- 右侧底部内容 -->
      <a-layout-content class="layout-content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import Menu from './components/Menu'
import { routes } from '@/router/config'
export default {
  components: {
    Menu
  },
  data() {
    return {
      collapsed: false,
      menus: []
    }
  },
  created () {
    // 获取菜单列表
    this.menus = routes.find(item => item.path === '/layout').children
  }
}
</script>
<style>
#layout-main {
  min-height: 100%;
}
#layout-main .layout-sub {
  overflow: hidden;
}
#layout-main .layout-trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
#layout-main .layout-trigger:hover {
  color: #1890ff;
}
#layout-main .layout-logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
#layout-main .layout-menu {
  width: 100%;
}
#layout-main .layout-header {
  background: #fff;
  padding: 0;
}
#layout-main .layout-content {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 280px;
}
</style>
