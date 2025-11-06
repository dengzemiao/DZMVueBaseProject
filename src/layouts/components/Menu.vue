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

<script setup>
/**
 * 菜单图标配置说明（自动识别，可以类型混搭）
 * 
 * 在路由配置的 meta 中设置图标相关属性，系统会自动识别图标类型。
 * 
 * 识别优先级（按顺序）：
 * 1. 网络图片（最高优先级）
 * 2. Ant Design Vue 组件
 * 3. 本地图片（有文件后缀）
 * 4. iconfont（字符串且无文件后缀）
 * 
 * @param {String|Object} icon - 默认图标（可选）
 * @param {String|Object} sicon - 选中/悬浮时的图标（可选）
 * 
 * 图标类型说明：
 * 
 * 1. 网络图片
 *   - 传入以 http:// 或 https:// 开头的 URL
 *   - 示例：meta: { icon: 'https://example.com/icon.png' }
 * 
 * 2. Ant Design Vue 组件
 *   - 传入组件对象（需先导入）
 *   - 示例：meta: { icon: HomeOutlined, sicon: MenuOutlined }
 *   - 需要安装：npm install @ant-design/icons-vue
 *   - 需要导入：import { HomeOutlined, MenuOutlined } from '@ant-design/icons-vue'
 * 
 * 3. 本地图片
 *   - 传入图片文件名（需放在 src/assets/img/ 目录下）
 *   - 必须包含文件后缀：.png, .jpg, .jpeg, .gif, .svg, .webp, .bmp, .ico
 *   - 示例：meta: { icon: 'menu_0_nomal.png', sicon: 'menu_0_select.png' }
 *   - 图片要求：16*16 像素，透明底色（推荐）
 * 
 * 4. iconfont 图标
 *   - 传入 iconfont 的 class 名称（字符串，无文件后缀）
 *   - 示例：meta: { icon: 'icon-home', sicon: 'icon-home-active' }
 *   - 使用方式：<span class="iconfont icon-home"></span>
 * 
 * 使用示例：
 * // 本地图片
 * meta: { icon: 'menu_0_nomal.png', sicon: 'menu_0_select.png' }
 * 
 * // Ant Design Vue 组件
 * meta: { icon: HomeOutlined, sicon: MenuOutlined }
 * 
 * // iconfont
 * meta: { icon: 'icon-home', sicon: 'icon-home-active' }
 * 
 * // 网络图片
 * meta: { icon: 'https://example.com/icon.png' }
 */
import { ref, watch, onMounted, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import MenuItem from './MenuItem.vue'

const props = defineProps({
  // 展开 || 收起
  collapsed: {
    type: Boolean,
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
    default: 'dark'
  },
  // 模式
  mode: {
    type: String,
    default: 'inline'
  },
  // 标题
  title: {
    type: String,
    default: ''
  }
})

const route = useRoute()

// hover 路由地址
const hoverPath = ref('')
// 当前选中的路由地址
const selectPath = ref('')
// 选中的路由
const selectedKeys = ref([])
// 展开菜单
const openKeys = ref([])

// 展开/关闭回调
const openChange = () => {
  // 刷新 hover 对象
  setTimeout(() => { reloadHoverEls() }, 100)
}

// 刷新 hover 对象
const reloadHoverEls = () => {
  // 获取所有 ant-menu-item
  const menuItems = Array.from(document.getElementsByClassName('ant-menu-item'))
  const menuSubs = Array.from(document.getElementsByClassName('ant-menu-submenu-title'))
  // 新增 hover
  menuItems.forEach(item => {
    // 移入元素
    item.onmouseenter = () => { mouseover(item) }
    // 移出元素
    item.onmouseleave = () => { mouseout(item) }
  })
  // 新增 hover
  menuSubs.forEach(item => {
    // 移入元素
    item.onmouseenter = () => { mouseover(item) }
    // 移出元素
    item.onmouseleave = () => { mouseout(item) }
  })
}

// 移入元素
const mouseover = (el) => {
  // 获取 menu-custom
  const menuCustom = Array.from(el.getElementsByClassName('menu-custom'))[0]
  // 获取 path
  const path = menuCustom.dataset.path
  // 记录 path
  hoverPath.value = path
}

// 移出元素
const mouseout = () => {
  // 清空路由对象
  hoverPath.value = ''
}

// 展开菜单
const reloadOpenKeys = () => {
  // 初始化展开菜单
  const matched = Array.from(route.matched)
  // 是否等于 3 个，说明有需要展开的菜单
  if (matched.length === 3) {
    // 需要展开的菜单
    const path = matched[1].path
    // 展开
    openKeys.value = [path]
  }
}

// 监听路由变化
watch(() => route.path, (newPath) => {
  // 记录当前选中的路由地址
  selectPath.value = newPath
  // 选中菜单路由
  selectedKeys.value = [selectPath.value]
}, { immediate: true })

// 初始化展开菜单
onBeforeMount(() => {
  reloadOpenKeys()
})

// 刷新 hover 对象
onMounted(() => {
  reloadHoverEls()
})
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