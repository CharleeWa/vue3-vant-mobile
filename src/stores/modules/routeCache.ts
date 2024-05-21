import { defineStore } from 'pinia'
import type { RouteRecordName } from 'vue-router'

const useRouteCacheStore = defineStore('route-cache', () => {
  const routeCaches = ref<RouteRecordName[]>([])

  const addRoute = (routeName: RouteRecordName) => {
    if (routeCaches.value.includes(routeName))
      return

    routeCaches.value.push(routeName)
  }

  return {
    routeCaches,
    addRoute,
  }
})

export default useRouteCacheStore
