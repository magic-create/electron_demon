const install = Vue => {
  //  定义方法
  const define = Vue.config.globalProperties
  define.$http.defaults.apiHost = import.meta.env.VITE_API_HOST
  define.$http.defaults.baseURL = define.$http.defaults.apiHost
  //  定义基础参数
  define.$http.defaults.timeout = 30e3
  define.$http.defaults.withCredentials = false
  //  请求拦截部分，如配置，每次请求前都会执行
  define.$http.interceptors.request.use(config => { return config }, error => { return Promise.reject(error) })
  //  响应拦截，如配置，每次请求结束都会执行本方法
  define.$http.interceptors.response.use(response => { return response }, error => {
      const response = error.response || {status: 500}
      const data = typeof response.data == 'string' ? {code: status, message: response.data} : {}
      data.code = data.code || response.status
      data.message = data.message || 'An unknown error'
      //	状态码
      switch(data.code){
        default:
          //  开发模式下输出错误
          if(process.env.NODE_ENV == 'development') console.error(data)
      }
      return Promise.reject(data)
    }
  )
}

export default {install}
