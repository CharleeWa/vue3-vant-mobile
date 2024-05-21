import { type RouteRecordName, createRouter, createWebHistory } from 'vue-router/auto'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { setupLayouts } from 'virtual:generated-layouts'
import type { EnhancedRouteLocation } from './types'
import useRouteTransitionNameStore from '@/stores/modules/routeTransitionName'
import useRouteCacheStore from '@/stores/modules/routeCache'

NProgress.configure({ showSpinner: true, parent: '#app' })

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_PUBLIC_PATH),
  extendRoutes: routes => setupLayouts(routes),
})

const routes = router.getRoutes()

function getSuperiorRouteNames(routeName: RouteRecordName) {
  const superiorRouteNames: RouteRecordName[] = []
  const route = routes.find(r => r.name === routeName)

  if (route) {
    const parentRoute = routes.find(r => r.children?.find(c => c.name === routeName))
    if (parentRoute && parentRoute.name) {
      superiorRouteNames.push(parentRoute.name as RouteRecordName)
      const _superiorRouteNames = getSuperiorRouteNames(parentRoute.name as RouteRecordName)
      if (Array.isArray(_superiorRouteNames))
        superiorRouteNames.push(..._superiorRouteNames)
    }
  }

  return superiorRouteNames
}

router.beforeEach((to: EnhancedRouteLocation, from, next) => {
  NProgress.start()

  const routeCacheStore = useRouteCacheStore()
  const routeTransitionNameStore = useRouteTransitionNameStore()
  if (to.meta.keepAlive && to.name) {
    const superiorRouteNames = getSuperiorRouteNames(to.name as RouteRecordName) || []
    superiorRouteNames.forEach(item => routeCacheStore.addRoute(item))
    routeCacheStore.addRoute(to.name)
  }

  if (to.meta.level > from.meta.level)
    routeTransitionNameStore.setName('slide-fadein-left')

  else if (to.meta.level < from.meta.level)
    routeTransitionNameStore.setName('slide-fadein-right')

  else
    routeTransitionNameStore.setName('')

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
