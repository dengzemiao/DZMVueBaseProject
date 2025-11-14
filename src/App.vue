<template>
   <a-config-provider :locale="locale">
    <RouterView />
   </a-config-provider>
 </template>
 
 <script setup>
 // 导入中文语言包
 import zhCN from 'ant-design-vue/es/locale/zh_CN';
 // 设置语言包
 const locale = zhCN;
 </script>
 
 <style scoped></style>
 