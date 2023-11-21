import axios from 'axios'
//导入路由
import router from '@/router/index';
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {

    //全局设置请求头
    config.headers.token = localStorage.getItem("token")

    return config
  }
)

// 响应拦截器
service.interceptors.response.use(
 
  response => {

    if(response.data.code == 403){
        //路由跳转到403页面
        router.push({path:"/403"})
    }


    return response.data

  }
)

export default service
