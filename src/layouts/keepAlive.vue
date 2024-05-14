<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useRouteCacheStore from '@/stores/modules/routeCache'

defineOptions({
  name: 'KeepAliveLayout',
})

const { routeCaches } = storeToRefs(useRouteCacheStore())
</script>

<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive :include="(routeCaches as string[])">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <div class="absolute left-0 top-200 w-full text-center">
      keepAlive Layout
    </div>
  </div>
</template>

<style scoped>

</style>
