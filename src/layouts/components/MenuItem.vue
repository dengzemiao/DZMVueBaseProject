<template>
  <!-- 自定义展示内容 -->
  <div class="menu-custom" :data-path="data.path" @click="touchRoute">
    <!-- 图标显示（自动识别，无需 type 参数） -->
    <template v-if="currentIconValue">
      <!-- 1. 网络图片（最高优先级） -->
      <template v-if="isNetworkImage(currentIconValue)">
        <img class="menu-img" :src="currentIconValue" :style="imageStyleObj">
      </template>
      <!-- 2. Ant Design Vue 组件 -->
      <template v-else-if="isComponent(currentIconValue)">
        <span class="menu-icon-component" :style="iconStyleObj">
          <component :is="getIconComponent(currentIconValue)" />
        </span>
      </template>
      <!-- 3. 本地图片（有文件后缀） -->
      <template v-else-if="isLocalImage(currentIconValue)">
        <img class="menu-img" :src="locationAssets(currentIconValue)" :style="imageStyleObj">
      </template>
      <!-- 4. iconfont（字符串且无文件后缀） -->
      <template v-else-if="typeof currentIconValue === 'string'">
        <span :class="`iconfont ${currentIconValue}`" :style="iconStyleObj"></span>
      </template>
    </template>
    <!-- 标题 -->
    <span class="menu-title">{{ data.meta.title }}</span>
  </div>
</template>

<script setup>
import { computed, watch, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

// 懒加载图片资源映射（不预加载，只在需要时加载）
const images = import.meta.glob('@/assets/img/*.{png,jpg,jpeg,gif,svg}', { eager: false, import: 'default' })

const props = defineProps({
  // 路由对象
  data: {
    type: Object,
    default: () => ({})
  },
  // hover 路由地址
  hoverPath: {
    type: String,
    default: ''
  },
  // 选中的路由地址
  selectPath: {
    type: String,
    default: ''
  },
  // 图标大小（单位：px，默认 18px）
  iconSize: {
    type: [Number, String],
    default: 18
  },
  // 图标样式（CSS 对象，如 { color: '#1890ff', fontWeight: 'bold' }）
  iconStyle: {
    type: Object,
    default: () => ({})
  }
})

const router = useRouter()

// 缓存已加载的图片 URL，避免重复加载
const imageCache = reactive({})

// 当前需要显示的 icon 值（根据选中状态和 hover 状态决定显示 icon 还是 sicon）
const currentIconValue = computed(() => {
  // 选中状态优先显示 sicon
  if (props.data.path === props.selectPath && props.data.meta.sicon) {
    return props.data.meta.sicon
  }
  // hover 状态显示 sicon
  if (props.data.path === props.hoverPath && props.data.meta.sicon) {
    return props.data.meta.sicon
  }
  // 默认显示 icon
  return props.data.meta.icon || ''
})

// 图标大小（转换为字符串）
const iconSizeStr = computed(() => {
  return typeof props.iconSize === 'number' ? `${props.iconSize}px` : props.iconSize
})

// 图片样式对象（只包含 width 和 height）
const imageStyleObj = computed(() => {
  return {
    width: iconSizeStr.value,
    height: iconSizeStr.value,
    ...props.iconStyle
  }
})

// 字体图标样式对象（包含 fontSize 和其他样式）
const iconStyleObj = computed(() => {
  return {
    fontSize: iconSizeStr.value,
    ...props.iconStyle
  }
})

// 判断是否为网络图片
const isNetworkImage = (icon) => {
  if (typeof icon !== 'string') return false
  return icon.startsWith('http://') || icon.startsWith('https://')
}

// 判断是否为组件
const isComponent = (icon) => {
  if (!icon) return false
  // 如果是函数，通常是 Vue 组件
  if (typeof icon === 'function') return true
  // 如果是对象且包含 Vue 组件的特征属性
  if (typeof icon === 'object' && icon !== null) {
    return 'render' in icon || 'setup' in icon || 'template' in icon || 'name' in icon
  }
  return false
}

// 判断是否为本地图片（有文件后缀）
const isLocalImage = (icon) => {
  if (typeof icon !== 'string') return false
  // 排除网络图片
  if (isNetworkImage(icon)) return false
  // 检查是否有图片文件后缀
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp', '.ico']
  return imageExtensions.some(ext => icon.toLowerCase().endsWith(ext))
}

// 异步加载本地图片（懒加载，仅用于本地图片）
const loadImage = async (icon) => {
  if (!icon || imageCache[icon] || isNetworkImage(icon)) return
  
  // 查找匹配的图片路径
  const matchedKey = Object.keys(images).find(key => key.includes(icon))
  
  if (matchedKey) {
    try {
      // 动态导入图片（懒加载）
      const imageModule = await images[matchedKey]()
      const imageUrl = imageModule.default || imageModule
      // 缓存结果（Vue 3 中直接赋值即可保持响应式）
      imageCache[icon] = imageUrl
    } catch (error) {
      console.warn(`Failed to load image: ${icon}`, error)
    }
  }
}

// 本地图片（同步方法，返回缓存的 URL）
const locationAssets = (icon) => {
  return imageCache[icon] || ''
}

// 获取图标组件（支持 Ant Design Vue 组件）
const getIconComponent = (icon) => {
  if (!icon) return null
  
  // 如果传入的是 Vue 组件（函数或包含 render/setup/template 的对象），直接返回
  if (typeof icon === 'function') {
    return icon
  }
  
  if (typeof icon === 'object' && icon !== null) {
    // Vue 3 组件通常包含 render、setup、template 等属性
    if ('render' in icon || 'setup' in icon || 'template' in icon || 'name' in icon) {
      return icon
    }
  }
  
  return null
}

// 点击路由
const touchRoute = () => {
  // 跳转路由
  if (props.data.children === undefined) {
    router.push(props.data.path)
  }
}

// 监听 hoverPath 变化，预加载 hover 状态的本地图片
watch(() => props.hoverPath, (newPath) => {
  if (newPath === props.data.path && props.data.meta.sicon && isLocalImage(props.data.meta.sicon)) {
    loadImage(props.data.meta.sicon)
  }
})

// 监听 currentIconValue 变化，预加载本地图片
watch(currentIconValue, (newIcon) => {
  if (newIcon && isLocalImage(newIcon)) {
    loadImage(newIcon)
  }
}, { immediate: true })

// 组件挂载时，预加载可能需要的本地图片（icon 和 sicon）
onMounted(() => {
  if (props.data.meta.icon && isLocalImage(props.data.meta.icon)) {
    loadImage(props.data.meta.icon)
  }
  if (props.data.meta.sicon && isLocalImage(props.data.meta.sicon)) {
    loadImage(props.data.meta.sicon)
  }
})
</script>

<style scoped>
.menu-custom {
  display: flex;
  align-items: center;
  height: 100%;
}
.menu-custom .menu-img {
  display: inline-block;
  margin-right: 10px;
  vertical-align: middle;
  /* 默认大小通过 iconSize prop 控制，内联样式会覆盖 */
  width: auto;
  height: auto;
}
.menu-custom .iconfont {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  vertical-align: middle;
  /* 默认大小通过 iconSize prop 控制，内联样式会覆盖 */
  font-size: inherit;
}
.menu-custom .menu-icon-component {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  vertical-align: middle;
}
.menu-custom .menu-icon-component :deep(.anticon) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  /* 大小通过父元素的 fontSize 控制 */
  font-size: inherit;
}
.menu-custom > span:last-child {
  margin-inline-start: 0 !important;
}
</style>