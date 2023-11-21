import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/403',
    component: Layout,
    children: [{
      path: '',
      name: '403',
      component: () => import('@/views/403'),
    }],
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/area',
    children: [{
      path: 'area',
      name: 'area',
      component: () => import('@/views/area/index'),
      meta: { title: '行政区管理', icon: '行政区管理' }
    },]
  },
  {
    path: '/tenantverify',
    component: Layout,
    children: [{
      path: 'tenantverify',
      name: 'tenantverify',
      component: () => import('@/views/tenantverify/index'),
      meta: { title: '租户审核', icon: '租户审核' }
    },]
  },
  {
    path: '/tenant',
    component: Layout,
    children: [{
      path: 'tenant',
      name: 'tenant',
      component: () => import('@/views/tenant/index'),
      meta: { title: '租户管理', icon: '租户管理' }
    },]
  },
  {
    path: '/Intustry',
    component: Layout,
    children: [{
      path: 'mgr',
      name: 'Dashboard',
      component: () => import('@/views/Intustry'),
      meta: { title: '行业管理', icon: '行业管理' }
    }, 
  ]
  },
  {
    path: '/type',
    component: Layout,
    children: [{
      path: 'type',
      name: 'type',
      component: () => import('@/views/type/index'),
      meta: { title: '设备类型管理', icon: '设备类型管理' }
    },]
  },
  {
    path: '/model',
    component: Layout,
    children: [{
      path: 'model',
      name: 'model',
      component: () => import('@/views/model/index'),
      meta: { title: '物模型管理', icon: '物模型管理' }
    },]
  },
  {
    path: '/product',
    component: Layout,
    children: [{
      path: 'product',
      name: 'product',
      component: () => import('@/views/product/index'),
      meta: { title: '产品管理', icon: '产品管理' }
    },]
  },
  {
    path: '/device',
    component: Layout,
    children: [{
      path: 'device',
      name: 'device',
      component: () => import('@/views/device/index'),
      meta: { title: '设备管理', icon: '设备管理' }
    },]
  },
  {
    path: '/pck',
    component: Layout,
    children: [{
      path: 'pck',
      name: 'pck',
      component: () => import('@/views/pck/index'),
      meta: { title: '套餐管理', icon: '套餐管理' }
    },]
  },
  {
    path: '/order',
    component: Layout,
    children: [{
      path: 'order',
      name: 'order',
      component: () => import('@/views/order/index'),
      meta: { title: '订单管理', icon: '订单管理' }
    },]
  },
  {
    path: '/perm',
    component: Layout,
    children: [{
      path: 'perm',
      name: 'perm',
      component: () => import('@/views/perm/index'),
      meta: { title: '权限管理', icon: '权限管理' }
    },]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
