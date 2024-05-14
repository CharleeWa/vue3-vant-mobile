<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useAppStore from '@/stores/modules/app'
import useRouteTransitionNameStore from '@/stores/modules/routeTransitionName'
import useAutoThemeSwitcher from '@/hooks/useAutoThemeSwitcher'

useHead({
  title: 'Vue3 Vant Mobile',
  meta: [
    {
      name: 'description',
      content: 'Vue + Vite H5 Starter Template',
    },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#00aba9' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})

const appStore = useAppStore()
const { mode } = storeToRefs(appStore)

const routeTransitionNameStore = useRouteTransitionNameStore()
const { routeTransitionName } = storeToRefs(routeTransitionNameStore)
const { initializeThemeSwitcher } = useAutoThemeSwitcher(appStore)

onMounted(() => {
  initializeThemeSwitcher()
})
</script>

<template>
  <VanConfigProvider :theme="mode">
    <NavBar />
    <router-view v-slot="{ Component }">
      <transition :name="routeTransitionName">
        <!-- 不同 layout 之间有缓存需求的话，需要加上 layout 组件的名称 -->
        <keep-alive :include="['DefaultLayout', 'KeepAliveLayout']">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
    <TabBar />
  </VanConfigProvider>
</template>
