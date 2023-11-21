import router from './router'
import 'nprogress/nprogress.css' // progress bar style
import { verifyToken } from '@/api/login'

const whiteList = ['/login'] // no redirect whitelist

//通过路由完成前端页面的全局校验
router.beforeEach(async (to, from, next) => {
  if (to.path == '/login') {
    //放行
    next();
  } else {
    //校验令牌
    verifyToken().then(res => {
      if (res.code != 200) {
        //路由到登录页
        next(`/login?redirect=${to.path}`)
      } else {
        //放行
        next();
      }
    })
  }
})
