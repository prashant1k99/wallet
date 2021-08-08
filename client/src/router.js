import Vue from 'vue'
import Router from 'vue-router'
import { getLocalData } from './utils'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      meta: {
        walletRequired: true
      }
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: () => import('./views/Transaction.vue'),
      meta: {
        walletRequired: true
      }
    },
    {
      path: '/wallet-signin',
      name: 'profile-wallet',
      component: () => import('./views/CreateWallet.vue'),
      meta: {
        walletRequired: false
      }
    },
    {
      path: '/error-404',
      name: 'error',
      component: () => import('./views/Error.vue')
    },
    {
      path: '*',
      redirect: '/error-404'
    }
  ]
})

router.beforeEach((to, _, next) => {
  const walletId = getLocalData('walletId')
  console.log(walletId)
  if (to.meta.walletRequired === true) {
    if (walletId) next()
    else router.push({ name: 'profile-wallet', query: { to: to.path } })
  } else if (to.meta.walletRequired === false) {
    if (walletId) {
      console.log('Entered')
      router.push(router.currentRoute.query.to || '/')
    }
    return next()
  } else {
    return next()
  }
})

export default router
