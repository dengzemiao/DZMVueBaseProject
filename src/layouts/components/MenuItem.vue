<template>
  <!-- 自定义展示内容 -->
  <div class="menu-custom" :data-path="data.path" @click="touchRoute">
    <!-- 本地图片 -->
    <template v-if="data.meta.type === 2">
      <!-- 有选中 icon -->
      <template v-if="data.meta.sicon">
        <!-- 选中路由地址 -->
        <template v-if="data.path === selectPath">
          <img class="menu-img" :src="locationAssets(data.meta.sicon)">
        </template>
        <!-- 未选中路由地址 -->
        <template v-else>
          <img v-if="data.meta.icon && data.path !== hoverPath" class="menu-img" :src="locationAssets(data.meta.icon)">
          <img v-if="data.meta.sicon && data.path === hoverPath" class="menu-img" :src="locationAssets(data.meta.sicon)">
        </template>
      </template>
      <!-- 无选中 icon -->
      <template v-else>
        <img class="menu-img" :src="locationAssets(data.meta.icon)">
      </template>
    </template>
    <!-- iconfont -->
    <template v-else-if="data.meta.type === 1">
      <!-- 有选中 icon -->
      <template v-if="data.meta.sicon">
        <!-- 选中路由地址 -->
        <template v-if="data.path === selectPath">
          <span :class="`iconfont ${data.meta.sicon}`"></span>
        </template>
        <!-- 未选中路由地址 -->
        <template v-else>
          <span v-if="data.meta.icon && data.path !== hoverPath" :class="`iconfont ${data.meta.icon}`"></span>
          <span v-if="data.meta.sicon && data.path === hoverPath" :class="`iconfont ${data.meta.sicon}`"></span>
        </template>
      </template>
      <!-- 无选中 icon -->
      <template v-else>
        <span :class="`iconfont ${data.meta.icon}`"></span>
      </template>
    </template>
    <!-- a-icon -->
    <template v-else>
      <!-- 有选中 icon -->
      <template v-if="data.meta.sicon">
        <!-- 选中路由地址 -->
        <template v-if="data.path === selectPath">
          <component :is="$icons[data.meta.sicon]" />
        </template>
        <!-- 未选中路由地址 -->
        <template v-else>
          <component v-if="data.meta.icon && data.path !== hoverPath" :is="$icons[data.meta.sicon]" />
          <component v-if="data.meta.sicon && data.path === hoverPath" :is="$icons[data.meta.sicon]" />
        </template>
      </template>
      <!-- 无选中 icon -->
      <template v-else>
        <component v-if="data.meta.icon" :is="$icons[data.meta.icon]" />
      </template>
    </template>
    <!-- 标题 -->
    <span>{{ data.meta.title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    // 路由对象
    data: {
      type: Object,
      default: () => {}
    },
    // hover 路由地址
    hoverPath: {
      type: String,
      default: () => ''
    },
    // 选中的路由地址
    selectPath: {
      type: String,
      default: () => ''
    }
  },
  methods: {
    // 点击路由
    touchRoute () {
      // 跳转路由
      if (this.data.children === undefined) {
        this.$router.push(this.data.path)
      }
    },
    // 本地图片
    locationAssets (icon) {
      return require(`@/assets/img/${icon}`)
    }
  }
}
</script>

<style scoped>
.menu-custom {
  display: flex;
  align-items: center;
  height: 100%;
}
.menu-custom .menu-img {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 10px;
}
.menu-custom .iconfont {
  display: inline-block;
  margin-right: 10px;
}
</style>