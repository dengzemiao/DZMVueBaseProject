<template>
  <div class="menu-view">
    <!-- 菜单 -->
    <a-menu
      class="menu-content"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      :mode="mode"
      :theme="theme"
      @openChange="openChange"
    >
      <!-- 便利菜单列表 -->
      <template v-for="item in menus">
        <!-- 有子菜单 -->
        <a-sub-menu :key="item.path" v-if="item.children && !item.hidden">
          <!-- 分组栏 -->
          <template #title>
            <MenuItem
              :data="item"
              :hoverPath="hoverPath"
              :selectPath="selectPath"
            ></MenuItem>
          </template>
          <!-- 便利子菜单 -->
          <template v-for="child in (item.children || [])">
            <!-- 子菜单元素 -->
            <a-menu-item :key="child.path" v-if="!child.hidden">
              <MenuItem
                :data="child"
                :hoverPath="hoverPath"
                :selectPath="selectPath"
              ></MenuItem>
            </a-menu-item>
          </template>
        </a-sub-menu>
        <!-- 没有子菜单 -->
        <template v-else>
          <a-menu-item :key="item.path" v-if="!item.hidden">
            <MenuItem
            :data="item"
            :hoverPath="hoverPath"
            :selectPath="selectPath"
          ></MenuItem>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script>
// icon：默认图片名称(可选)
// sicon：选中图片名称(可选)
// type：0、a-icon图片(默认)  1、iconfont图片(icon class) 2、本地图片Assets（16*16、透明底色）
// meta: { title: '路由名称', keepAlive: false, icon: 'home', sicon: 'setting', type: 0 }
import MenuItem from './MenuItem'
export default {
  components: {
    MenuItem
  },
  props: {
    // 展开 || 收起
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    // 菜单列表
    menus: {
      type: Array,
      required: true,
      default: () => []
    },
    // 主题
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    // 模式
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    // 标题
    title: {
      type: String,
      required: false,
      default: ''
    }
  },
  // 监听路由变化
  watch: {
    // 监听路由
    $route: {
      handler (newData) {
        // 记录当前选中的路由地址
        this.selectPath = newData.path
        // 选中菜单路由
        this.selectedKeys = [this.selectPath]
      },
      immediate: true
    }
  },
  data() {
    return {
      // hover 路由地址
      hoverPath: '',
      // 当前选中的路由地址
      selectPath: '',
      // 选中的路由
      selectedKeys: [],
      // 展开菜单
      openKeys: []
    }
  },
  created () {
    // 初始化展开菜单
    this.reloadOpenKeys()
  },
  mounted () {
    // 刷新 hover 对象
    this.reloadHoverEls()
  },
  methods: {
    // 展开/关闭回调
    openChange () {
      // 刷新 hover 对象
      setTimeout(() => { this.reloadHoverEls() }, 100);
    },
    // 刷新 hover 对象
    reloadHoverEls () {
      // 获取所有 ant-menu-item
      const menuItems = Array.from(document.getElementsByClassName('ant-menu-item'))
      const menuSubs = Array.from(document.getElementsByClassName('ant-menu-submenu-title'))
      // 新增 hover
      menuItems.forEach(item => {
        // 移入元素
        item.onmouseenter = () => { this.mouseover(item) }
        // 移出元素
        item.onmouseleave = () => { this.mouseout(item) }
      })
      // 新增 hover
      menuSubs.forEach(item => {
        // 移入元素
        item.onmouseenter = () => { this.mouseover(item) }
        // 移出元素
        item.onmouseleave = () => { this.mouseout(item) }
      })
    },
    // 移入元素
    mouseover (el) {
      // 获取 menu-custom
      const menuCustom = Array.from(el.getElementsByClassName('menu-custom'))[0]
      // 获取 path
      const path = menuCustom.dataset.path
      // 记录 path
      this.hoverPath = path
    },
    // 移出元素
    mouseout () {
      // 清空路由对象
      this.hoverPath = ''
    },
    // 展开菜单
    reloadOpenKeys () {
      // 初始化展开菜单
      const matched = Array.from(this.$route.matched)
      // 是否等于 3 个，说明有需要展开的菜单
      if (matched.length === 3) {
        // 需要展开的菜单
        const path = matched[1].path
        // 展开
        this.openKeys = [path]
      }
    }
  }
}
</script>

<style>
.menu-view .ant-menu-inline {
  border: none !important;
}
.menu-view .ant-menu-inline-collapsed .ant-menu-item .menu-custom>span,
.menu-view .ant-menu-inline-collapsed .ant-menu-submenu .menu-custom>span {
  opacity: 0;
}
</style>
<style scoped>
.menu-view {
  height: max-content;
}
.menu-content {
  padding: 16px 0;
}
</style>