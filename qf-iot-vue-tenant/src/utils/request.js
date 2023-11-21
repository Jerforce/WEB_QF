import axios from 'axios'
import router from '@/router';

// 创建axios
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    config.headers.token = localStorage.getItem("token");
    return config;
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    if (response.data.code == 3) {
      // 路由跳转到403页面
      router.push({path: "/403"})
    }
    return response.data;
  }
)

export default service
