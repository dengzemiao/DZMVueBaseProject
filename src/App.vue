<template>
  <!-- 配置显示语言 -->
  <a-config-provider :locale="zhCN">
    <!-- 主渲染视图 -->
    <div id="app" class="container-full">
      <router-view/>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  data () {
    return {
      zhCN
    }
  }
}
</script>

<style>
</style>
