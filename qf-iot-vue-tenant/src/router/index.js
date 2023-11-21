import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/login'),
    hidden: true
  },

  {
    path: '/register',
    component: () => import('@/views/register/register'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '',
    component: Layout,
    redirect: 'dashboard',// 登录之后路由到dashboard
    children: [{
      path: '/dashboard',
      name: '套餐功能',
      component: () => import('@/views/package/package'),
      meta: { title: '套餐功能', icon: '套餐管理' }
    }]
  },

  {
    path: '/p',
    component: Layout,
    meta: { title: '产品功能', icon: '产品管理' },
    children: [{
      path: '/myProduct',
      name: '我的产品',
      component: () => import('@/views/product/myProduct'),
      meta: { title: '我的产品', icon: '产品管理' }
    },
    {
      path: '/product',
      name: '全部产品',
      component: () => import('@/views/product/product'),
      meta: { title: '全部产品', icon: '产品管理' }
    }]
  },

  {
    path: '/d',
    component: Layout,//基础布局
    meta: { title: '设备功能', icon: 'dashboard' },
    children: [{
      path: '/myDevice',
      name: '我的设备',
      component: () => import('@/views/device/myDevice'),
      meta: { title: '我的设备', icon: '设备类型管理' }
    }, {
      path: '/device',
      name: '全部设备',
      component: () => import('@/views/device/device'),
      meta: { title: '全部设备', icon: '设备管理' }
    }]
  },

  {
    path: '/industry',
    component: Layout,//基础布局
    children: [{
      path: '/industry',
      name: '行业功能',
      component: () => import('@/views/industry/industry'),
      meta: { title: '行业功能', icon: '行业管理' }
    }]
  },

  {
    path: '/detail',
    component: Layout,//基础布局
    hidden: true,
    children: [{
      path: '',
      name: '设备详情',
      component: () => import('@/views/device/detail'),
      meta: { title: '设备详情', icon: '设备类型管理' }
    }]
  },

  {
    path: '/addProduct',
    component: Layout,//基础布局
    hidden: true,
    children: [{
      path: '',
      name: '添加产品',
      component: () => import('@/views/product/addProduct'),
      meta: { title: '添加产品', icon: '产品管理' }
    }]
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
