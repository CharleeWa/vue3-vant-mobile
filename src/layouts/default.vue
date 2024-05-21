<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useRouteCacheStore from '@/stores/modules/routeCache'

defineOptions({
  name: 'DefaultLayout',
})

const { routeCaches } = storeToRefs(useRouteCacheStore())
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="(routeCaches as string[])">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style scoped>

</style>
